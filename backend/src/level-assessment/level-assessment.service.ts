import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AssessmentQuestion } from './entities/assessment-question.entity';
import { CreateAssessmentQuestionDto, AssessmentQuestionDto } from './dto';

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
}
