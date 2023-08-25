import { Model } from 'mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../auth/entities/user.entity';
import { LoginRecord } from './entities/login-record.entity';
import { WordProgress, LessonProgress } from '../learn/entities';
import { QuizProgress } from '../quiz/entities';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserToSend } from '../auth/interface/user.interface';
import { LevelUpTestProgress } from '../level-up-test/entities';
@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(LoginRecord.name)
    private readonly loginRecordModel: Model<LoginRecord>,
    @InjectModel(QuizProgress.name)
    private readonly quizProgressModel: Model<QuizProgress>,
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgress>,
    @InjectModel(WordProgress.name)
    private readonly wordProgressModel: Model<WordProgress>,

    @InjectModel(LevelUpTestProgress.name)
    private readonly levelUpTestProgressModel: Model<LevelUpTestProgress>,
  ) {}

  /**
   * When leveling up, update the user's level and reset their learning progress.
   */
  async getUserInfo(userId: string): Promise<UserToSend> {
    try {
      const user = await this.userModel.findById(userId);
      return {
        _id: user._id,
        email: user.email,
        name: user.name,
        level: user.level,
        isLevelAssessed: user.isLevelAssessed,
        isLearningStarted: user.isLearningStarted,
      };
    } catch (err) {
      throw new InternalServerErrorException('Error getting user info');
    }
  }

  async getUserStats(userId: string): Promise<UserStatsDto> {
    try {
      const user = await this.userModel.findById(userId);
      const record = await this.loginRecordModel
        .findOne({
          user: userId,
        })
        .exec();

      const stats = await this.getLearningStats(userId, user.level);
      const isLevelUpTestTakenToday = await this.checkIfLevelUpTestTakenToday(
        userId,
        user.level,
      );

      return {
        name: user.name,
        email: user.email,
        level: user.level,
        currentStreak: record.currentStreak,
        longestStreak: record.longestStreak,
        isLevelUpTestTakenToday,
        ...stats,
      };
    } catch (err) {
      throw new InternalServerErrorException('Error getting user stats');
    }
  }

  private async checkIfLevelUpTestTakenToday(
    userId: string,
    level: string,
  ): Promise<boolean> {
    const levelUpTestProgress = await this.levelUpTestProgressModel
      .findOne({
        user: userId,
        level: level,
      })
      .exec();

    if (!levelUpTestProgress) {
      return false;
    }

    const today = new Date();
    const lastTestAttempt = await this.levelUpTestProgressModel
      .findOne({ user: userId, level: level })
      .exec();

    return (
      lastTestAttempt &&
      lastTestAttempt.lastTestAttemptDate.getDate() === today.getDate()
    );
  }

  private async getLearningStats(userId: string, level: string): Promise<any> {
    const lessonProgressPromise = this.lessonProgressModel
      .countDocuments({
        user: userId,
        status: 'completed',
        level: level,
      })
      .exec();
    const wordProgressPromise = this.wordProgressModel
      .countDocuments({
        user: userId,
        level: level,
        isLearned: true,
      })
      .exec();
    const quizProgressPromise = this.quizProgressModel
      .countDocuments({
        user: userId,
        level: level,
        isCompleted: true,
      })
      .exec();
    const quizHighestScorePromise = this.quizProgressModel
      .findOne({
        user: userId,
        level: level,
      })
      .select('score')
      .sort({ score: -1 })
      .limit(1)
      .exec()
      .then((result) => result?.score ?? 0);

    const quizAverageScorePromise = this.quizProgressModel
      .aggregate([
        { $match: { user: userId, level: level } },
        { $group: { _id: null, average: { $avg: '$score' } } },
      ])
      .exec()
      .then((result) => result[0]?.average ?? 0);

    const [
      totalLessonsCompleted,
      totalWordsLearned,
      totalQuizzesCompleted,
      quizHighestScore,
      quizAverageScore,
    ] = await Promise.all([
      lessonProgressPromise,
      wordProgressPromise,
      quizProgressPromise,
      quizHighestScorePromise,
      quizAverageScorePromise,
    ]);

    return {
      totalLessonsCompleted,
      totalWordsLearned,
      totalQuizzesCompleted,
      quizHighestScore,
      quizAverageScore,
    };
  }
}
