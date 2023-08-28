import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AssessmentQuestion } from './entities/assessment-question.entity';
import { User, Level } from '../auth/entities/user.entity';
import {
  CreateAssessmentQuestionDto,
  AssessmentQuestionDto,
  UserAnswerDto,
} from './dto';
import { UserToSend } from '../auth/interface/user.interface';

@Injectable()
export class LevelAssessmentService {
  constructor(
    @InjectModel(AssessmentQuestion.name)
    private readonly assessmentQuestionModel: Model<AssessmentQuestion>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  /**
   * Retrieves a total of 15 questions, with 5 questions from each level (Beginner, Intermediate, Advanced)
   */
  async getQuestions(): Promise<AssessmentQuestionDto[]> {
    const questionCounts = { Beginner: 5, Intermediate: 5, Advanced: 5 };
    const selectedQuestions: AssessmentQuestion[] = [];

    for (const level in questionCounts) {
      if (Object.prototype.hasOwnProperty.call(questionCounts, level)) {
        const questions = await this.assessmentQuestionModel
          .find({ level })
          .limit(questionCounts[level])
          .exec();

        selectedQuestions.push(...questions);
      }
    }

    return selectedQuestions.map((question) => ({
      _id: question._id,
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      level: question.level,
    }));
  }
  async addQuestion(
    assessmentQuestionDto: CreateAssessmentQuestionDto,
  ): Promise<{ message: string }> {
    const { questionText, options, correctAnswer, level } =
      assessmentQuestionDto;

    try {
      await this.assessmentQuestionModel.create({
        questionText,
        options,
        correctAnswer,
        level,
      });

      return {
        message: 'Question added successfully',
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'A question with the same content already exists',
        );
      }
      throw new InternalServerErrorException(
        'Failed to create the question due to an internal error',
      );
    }
  }

  async addQuestions(
    assessmentQuestionDto: CreateAssessmentQuestionDto[],
  ): Promise<{ message: string }> {
    try {
      await this.assessmentQuestionModel.insertMany(assessmentQuestionDto);
      return {
        message: 'Questions added successfully',
      };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'A question with the same content already exists',
        );
      }
      throw new InternalServerErrorException(
        'Failed to create the questions due to an internal error',
      );
    }
  }

  async deleteQuestion(id: string): Promise<{ message: string }> {
    try {
      await this.assessmentQuestionModel.deleteOne({
        _id: id,
      });
      return { message: 'Question deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete the question due to an internal error',
      );
    }
  }

  async deleteQuestions(): Promise<{ message: string }> {
    try {
      await this.assessmentQuestionModel.deleteMany({});
      return { message: 'Questions deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete the questions due to an internal error',
      );
    }
  }

  /**
   * Calculate the user's proficiency ratio by dividing their weighted score by the maximum possible weighted score.
   * Determine the user's proficiency level:
   ** If the proficiency ratio is <= 0.50, assign BEGINNER level.
   ** If the proficiency ratio is <= 0.80, assign INTERMEDIATE level.
   ** Otherwise, assign ADVANCED level.
   */
  async assessLevel(
    userAnswerDto: UserAnswerDto[],
    userId: string,
  ): Promise<{
    level: Level;
    correctCounts: Record<
      Level.BEGINNER | Level.INTERMEDIATE | Level.ADVANCED,
      number
    >;
    scorePercentage: number;
    user: UserToSend;
  }> {
    const difficultyWeights = {
      [Level.BEGINNER]: 1,
      [Level.INTERMEDIATE]: 2,
      [Level.ADVANCED]: 3,
    };

    try {
      const questions = await this.assessmentQuestionModel.find().exec();

      const { maxPossibleWeightedScore, userWeightedScore, correctCounts } =
        userAnswerDto.reduce(
          (accumulator, userAnswer) => {
            const question = questions.find((q) =>
              q._id.equals(userAnswer.questionId),
            );

            if (
              question &&
              userAnswer.selectedAnswer === question.correctAnswer
            ) {
              accumulator.userWeightedScore +=
                difficultyWeights[question.level];
              accumulator.correctCounts[question.level]++;
            }

            return accumulator;
          },
          {
            maxPossibleWeightedScore:
              5 * difficultyWeights[Level.BEGINNER] +
              5 * difficultyWeights[Level.INTERMEDIATE] +
              5 * difficultyWeights[Level.ADVANCED],
            userWeightedScore: 0,
            correctCounts: {
              [Level.BEGINNER]: 0,
              [Level.INTERMEDIATE]: 0,
              [Level.ADVANCED]: 0,
            },
          },
        );

      const userProficiencyRatio = userWeightedScore / maxPossibleWeightedScore;
      const scorePercentage = parseFloat(
        (userProficiencyRatio * 100).toFixed(2),
      );

      const userProficiencyLevel =
        userProficiencyRatio <= 0.5
          ? Level.BEGINNER
          : userProficiencyRatio <= 0.8
          ? Level.INTERMEDIATE
          : Level.ADVANCED;

      const user = await this.userModel.findOneAndUpdate(
        { _id: userId },
        { level: userProficiencyLevel, isLevelAssessed: true },
        { new: true },
      );

      const userToSend: UserToSend = {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        level: user.level,
        isLevelAssessed: user.isLevelAssessed,
        isLearningStarted: user.isLearningStarted,
      };

      return {
        level: userProficiencyLevel,
        correctCounts,
        scorePercentage,
        user: userToSend,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'An internal error occurred while assessing the user level.',
      );
    }
  }
}
