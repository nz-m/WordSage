import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonProgress, WordProgress } from '../learn/entities';
import { LevelUpTestProgress } from '../level-up-test/entities';
import { QuizProgress, QuizQuestion, Quiz } from '../quiz/entities';
import { User, Level } from '../auth/entities/user.entity';
import { Lesson, Word } from '../learn/entities';
import { LessonTitle } from '../learn/entities/word.entity';
import { AssessmentQuestion } from '../level-assessment/entities/assessment-question.entity';
import { LevelUpTestQuestion } from '../level-up-test/entities';
import { SetupStats } from './interface/setup-stats.interface';

@Injectable()
export class DevService {
  constructor(
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgress>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(WordProgress.name)
    private readonly wordProgressModel: Model<WordProgress>,
    @InjectModel(LevelUpTestProgress.name)
    private readonly levelUpTestProgressModel: Model<LevelUpTestProgress>,
    @InjectModel(QuizProgress.name)
    private readonly quizProgressModel: Model<QuizProgress>,
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
    @InjectModel(Word.name)
    private readonly wordModel: Model<Word>,
    @InjectModel(QuizQuestion.name)
    private readonly quizQuestionModel: Model<QuizQuestion>,
    @InjectModel(AssessmentQuestion.name)
    private readonly assessmentQuestionModel: Model<AssessmentQuestion>,
    @InjectModel(Quiz.name)
    private readonly quizModel: Model<Quiz>,
    @InjectModel(LevelUpTestQuestion.name)
    private readonly levelUpTestQuestionModel: Model<LevelUpTestQuestion>,
  ) {}

  async getSetupStats(): Promise<SetupStats> {
    try {
      const requiredLevels = [
        Level.BEGINNER,
        Level.INTERMEDIATE,
        Level.ADVANCED,
      ];
      const minQuestionCount = 5;

      const assessmentQuestionCounts =
        await this.assessmentQuestionModel.countDocuments({
          level: { $in: requiredLevels },
        });

      const existingLessonTitles = await this.lessonModel.distinct('title');

      const wordsCount = await this.wordModel.countDocuments();

      const lessonQuestionCount = await this.quizQuestionModel.countDocuments({
        lessonTitle: { $in: Object.values(LessonTitle) },
      });

      const quizCount = await this.quizModel.countDocuments({
        lessonTitle: { $in: Object.values(LessonTitle) },
        level: { $in: requiredLevels },
      });

      const levelUpTestQuestionCount =
        await this.levelUpTestQuestionModel.countDocuments({
          lessonTitle: { $in: Object.values(LessonTitle) },
          level: { $in: requiredLevels },
        });

      console.log(levelUpTestQuestionCount);

      const assessmentQuestionsAdded =
        assessmentQuestionCounts >= minQuestionCount;

      const allLessonsCreated = Object.values(LessonTitle).every(
        (lessonTitle) => existingLessonTitles.includes(lessonTitle),
      );

      const wordsAdded = wordsCount > 0;
      const quizQuestionsAdded = lessonQuestionCount >= minQuestionCount;
      const quizCreated = quizCount > 0;
      const levelUpTestQuestionsAdded =
        levelUpTestQuestionCount >= minQuestionCount;

      return {
        assessmentQuestionsAdded,
        allLessonsCreated,
        wordsAdded,
        quizQuestionsAdded,
        quizCreated,
        levelUpTestQuestionsAdded,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while getting the stats',
      );
    }
  }

  async getAllUsers(): Promise<any> {
    try {
      const users = await this.userModel.find().lean();

      return users.map((user) => {
        const { password, ...result } = user;
        return result;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting all users');
    }
  }

  async markAllLessonsAsCompleted(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.lessonProgressModel.updateMany(
        { user: userId, level },
        { $set: { status: 'completed' } },
      );
      return { success: true, message: 'All lessons marked as completed' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marking all lessons as completed',
      );
    }
  }

  async markAllLessonsAsNotCompleted(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.lessonProgressModel.updateMany(
        { user: userId, level },
        { $set: { isCompleted: false } },
      );
      return { success: true, message: 'All lessons marked as not completed' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marking all lessons as not completed',
      );
    }
  }

  async updateUserLevel(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.userModel.updateOne({ _id: userId }, { $set: { level } });
      return { success: true, message: 'User level updated' };
    } catch (error) {
      throw new InternalServerErrorException('Error updating user level');
    }
  }

  async updateUserLevelAssessedStatus(
    userId: string,
    isLevelAssessed: boolean,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.userModel.updateOne(
        { _id: userId },
        { $set: { isLevelAssessed } },
      );
      return { success: true, message: 'User level assessed status updated' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating user level assessed status',
      );
    }
  }

  async markALlWordsAsLearned(
    userId: string,
    level: string,
    lessonTitle: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const words = await this.lessonProgressModel.find({
        level,
        lessonTitle,
      });

      const wordProgressPromises = words.map(async (word) => {
        const wordProgress = new this.wordProgressModel({
          level,
          user: new Types.ObjectId(userId),
          word: word._id,
          lessonTitle,
          isLearned: true,
        });
        await wordProgress.save();
      });

      await Promise.all(wordProgressPromises);

      return { success: true, message: 'All words marked as completed' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marking all words as completed',
      );
    }
  }

  async removeTestRestriction(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.levelUpTestProgressModel.deleteOne({
        user: new Types.ObjectId(userId),
        level,
      });

      return { success: true, message: 'Test restriction removed' };
    } catch (error) {
      throw new InternalServerErrorException('Error removing test restriction');
    }
  }

  async removeQuizProgress(
    userId: string,
    level: string,
    lessonTitle: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.quizProgressModel.deleteOne({
        user: new Types.ObjectId(userId),
        level,
        lessonTitle,
      });

      return { success: true, message: 'Quiz progress deleted' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting quiz progress');
    }
  }
}
