import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  AssessmentQuestion,
  QuestionLevel,
} from './entities/assessment-question.entity';
import {
  CreateAssessmentQuestionDto,
  AssessmentQuestionDto,
  UserAnswerDto,
} from './dto';

@Injectable()
export class LevelAssessmentService {
  constructor(
    @InjectModel(AssessmentQuestion.name)
    private assessmentQuestionModel: Model<AssessmentQuestion>,
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
      console.error('An error occurred:', error.message);
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

  /**
   * Calculate the user's proficiency ratio by dividing their weighted score by the maximum possible weighted score.
   * Determine the user's proficiency level:
   ** If the proficiency ratio is <= 0.33, assign BEGINNER level.
   ** If the proficiency ratio is <= 0.66, assign INTERMEDIATE level.
   ** Otherwise, assign ADVANCED level.
   */
  async assessLevel(userAnswerDto: UserAnswerDto[]): Promise<{
    level: QuestionLevel;
    correctCounts: Record<QuestionLevel, number>;
    scorePercentage: number;
  }> {
    const difficultyWeights = {
      [QuestionLevel.BEGINNER]: 1,
      [QuestionLevel.INTERMEDIATE]: 2,
      [QuestionLevel.ADVANCED]: 3,
    };

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
            accumulator.userWeightedScore += difficultyWeights[question.level];
            accumulator.correctCounts[question.level]++;
          }

          return accumulator;
        },
        {
          maxPossibleWeightedScore:
            5 * difficultyWeights[QuestionLevel.BEGINNER] +
            5 * difficultyWeights[QuestionLevel.INTERMEDIATE] +
            5 * difficultyWeights[QuestionLevel.ADVANCED],
          userWeightedScore: 0,
          correctCounts: {
            [QuestionLevel.BEGINNER]: 0,
            [QuestionLevel.INTERMEDIATE]: 0,
            [QuestionLevel.ADVANCED]: 0,
          },
        },
      );

    const userProficiencyRatio = userWeightedScore / maxPossibleWeightedScore;
    const scorePercentage = parseFloat((userProficiencyRatio * 100).toFixed(2));

    const userProficiencyLevel =
      userProficiencyRatio <= 0.33
        ? QuestionLevel.BEGINNER
        : userProficiencyRatio <= 0.66
        ? QuestionLevel.INTERMEDIATE
        : QuestionLevel.ADVANCED;

    return {
      level: userProficiencyLevel,
      correctCounts,
      scorePercentage,
    };
  }
}
