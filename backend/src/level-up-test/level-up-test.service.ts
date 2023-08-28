import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { LevelUpTestQuestion, LevelUpTestProgress } from './entities';
import { LevelUpTestQuestionDto, CreateLevelUpQuestionDto } from './dto';
import { User } from '../auth/entities/user.entity';
import { LessonProgress } from '../learn/entities';
import { UserAnswerDto } from '../level-assessment/dto';
import { Level } from '../auth/entities/user.entity';
import { UserToSend } from '../auth/interface/user.interface';
import { LessonTitle } from '../learn/entities/word.entity';

@Injectable()
export class LevelUpTestService {
  constructor(
    @InjectModel(LevelUpTestQuestion.name)
    private readonly levelUpTestQuestionModel: Model<LevelUpTestQuestion>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgress>,
    @InjectModel(LevelUpTestProgress.name)
    private readonly levelUpTestProgressModel: Model<LevelUpTestProgress>,
  ) {}

  /**
   * Retrieve 10 questions from the database based on user's level
   */
  async getQuestions(level: string): Promise<LevelUpTestQuestionDto[]> {
    const questions = await this.levelUpTestQuestionModel
      .find({ level })
      .limit(10)
      .exec();

    return questions.map((question) => ({
      _id: question._id,
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      level: question.level,
      lessonTitle: question.lessonTitle,
    }));
  }

  async addQuestion(
    levelUpTestQuestionDto: CreateLevelUpQuestionDto,
  ): Promise<{ message: string }> {
    const { questionText, options, correctAnswer, level } =
      levelUpTestQuestionDto;

    try {
      await this.levelUpTestQuestionModel.create({
        questionText,
        options,
        correctAnswer,
        level,
      });

      return { message: 'Question added successfully' };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Question already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async addQuestions(
    levelUpTestQuestionDto: CreateLevelUpQuestionDto[],
  ): Promise<{ message: string }> {
    try {
      await this.levelUpTestQuestionModel.insertMany(levelUpTestQuestionDto);

      return { message: 'Questions added successfully' };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Question already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async deleteQuestion(id: string): Promise<{ message: string }> {
    try {
      await this.levelUpTestQuestionModel.findByIdAndDelete(id);
      return { message: 'Question deleted successfully' };
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async startTest(
    userId: string,
    level: string,
  ): Promise<LevelUpTestQuestionDto[]> {
    const completedLessons = await this.lessonProgressModel
      .countDocuments({
        user: userId,
        status: 'completed',
        level: level,
      })
      .exec();

    if (completedLessons < 10) {
      throw new BadRequestException(
        'You need to complete all the lessons of your current level before taking the test',
      );
    }

    const today = new Date();
    const lastTestAttempt = await this.levelUpTestProgressModel
      .findOne({ user: userId, level: level })
      .exec();

    if (
      lastTestAttempt &&
      lastTestAttempt.lastTestAttemptDate.getDate() === today.getDate()
    ) {
      throw new BadRequestException(
        'You can only take the test once a day. Please try again tomorrow',
      );
    }

    const lessonTitles = [
      LessonTitle.EVERYDAY_CONVERSATIONS,
      LessonTitle.PERSONAL_INFORMATION,
      LessonTitle.HOME_AND_LIVING,
      LessonTitle.FOOD_AND_DINING,
      LessonTitle.TRAVEL_AND_TRANSPORTATION,
      LessonTitle.HEALTH_AND_WELLNESS,
      LessonTitle.WORK_AND_CAREERS,
      LessonTitle.EDUCATION_AND_LEARNING,
      LessonTitle.NATURE_AND_ENVIRONMENT,
    ];

    const allQuestions = await this.levelUpTestQuestionModel.find({ level });

    const selectedQuestions = {};

    allQuestions.forEach((question) => {
      if (
        lessonTitles.includes(question.lessonTitle) &&
        !selectedQuestions[question.lessonTitle]
      ) {
        selectedQuestions[question.lessonTitle] = question;
      }
    });

    const questionsToSend: LevelUpTestQuestionDto[] =
      Object.values(selectedQuestions);

    await this.levelUpTestProgressModel.updateOne(
      { user: userId, level: level },
      { user: userId, level: level, lastTestAttemptDate: today },
      { upsert: true },
    );

    return questionsToSend.map((question) => ({
      _id: question._id,
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      level: question.level,
      lessonTitle: question.lessonTitle,
    }));
  }

  async assessTest(
    userAnswerDto: UserAnswerDto[],
    userId: string,
    level: string,
  ): Promise<{
    scorePercentage: number;
    userData: UserToSend;
  }> {
    try {
      const questions = await this.levelUpTestQuestionModel.find({ level });

      let correctAnswers = 0;

      for (const userAnswer of userAnswerDto) {
        const question = questions.find(
          (q) => q._id.toString() === userAnswer.questionId,
        );

        if (question && question.correctAnswer === userAnswer.selectedAnswer) {
          correctAnswers++;
        }
      }

      const totalQuestions = questions.length;
      const scorePercentage = (correctAnswers / totalQuestions) * 100;

      if (scorePercentage >= 80) {
        let updatedUserLevel = level;
        if (level === Level.BEGINNER) {
          updatedUserLevel = Level.INTERMEDIATE;
        } else if (level === Level.INTERMEDIATE) {
          updatedUserLevel = Level.ADVANCED;
        } else if (level === Level.ADVANCED) {
          updatedUserLevel = Level.EXPERT;
        }

        await this.userModel.updateOne(
          { _id: userId },
          {
            level: updatedUserLevel,
            isLearningStarted: updatedUserLevel === Level.EXPERT,
          },
        );
      }

      const updatedUser = await this.userModel.findById(userId);

      const userData = {
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        level: updatedUser.level,
        isLevelAssessed: updatedUser.isLevelAssessed,
        isLearningStarted: updatedUser.isLearningStarted,
      };

      await this.levelUpTestProgressModel.updateOne(
        { user: userId, level: level },
        { scorePercentage: scorePercentage },
      );

      return { scorePercentage, userData };
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while assessing the test.',
      );
    }
  }
}
