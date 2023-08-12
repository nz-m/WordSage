import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AssessmentQuestion } from './entities/assessment-question.entity';
import { AssessmentQuestionDto } from './dto/assessment-question.dto';

@Injectable()
export class LevelAssessmentService {
  constructor(
    @InjectModel(AssessmentQuestion.name)
    private assessmentQuestionModel: Model<AssessmentQuestion>,
  ) {}

  /**
   * Retrieves a total of 15 questions, with 5 questions from each level (beginner, intermediate, advanced)
   */
  async getQuestions(): Promise<AssessmentQuestionDto[]> {
    const questionCounts = { beginner: 5, intermediate: 5, advanced: 5 };
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
      sl: question.sl,
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
      level: question.level,
    }));
  }

  async addQuestion(
    assessmentQuestionDto: AssessmentQuestionDto,
  ): Promise<{ message: string }> {
    const { sl, questionText, options, correctAnswer, level } =
      assessmentQuestionDto;

    try {
      await this.assessmentQuestionModel.create({
        sl,
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
    assessmentQuestionDto: AssessmentQuestionDto[],
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

  async deleteQuestion(sl: number): Promise<{ message: string }> {
    try {
      await this.assessmentQuestionModel.deleteOne({ sl });
      return { message: 'Question deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete the question due to an internal error',
      );
    }
  }
}
