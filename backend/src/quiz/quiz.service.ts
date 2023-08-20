import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Quiz, QuizProgress, QuizQuestion } from './entities';
import { User } from '../auth/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizQuestionDto } from './dto/quiz-question.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question, QuizResult, UserAnswer } from './interface/quiz.interface';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @InjectModel(QuizQuestion.name)
    private readonly quizQuestionModel: Model<QuizQuestion>,
    @InjectModel(QuizProgress.name)
    private readonly quizProgressModel: Model<QuizProgress>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async addQuestion(
    quizQuestionDto: QuizQuestionDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const createdQuestion = new this.quizQuestionModel(quizQuestionDto);
      await createdQuestion.save();

      return { success: true, message: 'Question added.' };
    } catch (error) {
      return {
        success: false,
        message:
          'Failed to add question. Check if the question already exists.',
      };
    }
  }

  async addQuestions(
    quizQuestionDtos: QuizQuestionDto[],
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.quizQuestionModel.insertMany(quizQuestionDtos);
      return { success: true, message: 'Questions added.' };
    } catch (error) {
      return {
        success: false,
        message:
          'Failed to add questions. Check if the questions already exist.',
      };
    }
  }

  async createQuiz(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const { title, level, lessonTitle, timeLimit, numberOfQuestions } =
      createQuizDto;

    const questions = await this.quizQuestionModel
      .find({ lessonTitle, level })
      .limit(numberOfQuestions)
      .exec();

    if (!questions || questions.length < numberOfQuestions) {
      throw new NotFoundException(
        'Not enough questions available for the quiz criteria.',
      );
    }

    const createdQuiz = new this.quizModel({
      title,
      level,
      lessonTitle,
      timeLimit,
      numberOfQuestions,
      questions: questions.map((question) => question._id),
    });

    return createdQuiz.save();
  }

  async getUnattemptedQuiz(
    level: string,
    lessonTitle: string,
    userId: string,
  ): Promise<Quiz> {
    const quiz = await this.quizModel.findOne({ level, lessonTitle }).populate({
      path: 'questions',
      model: 'QuizQuestion',
    });

    if (!quiz) {
      throw new NotFoundException('No quiz found for the given criteria.');
    }

    const quizProgress = await this.quizProgressModel
      .findOne({
        user: userId,
        quiz: quiz._id,
        isAttempted: true,
      })

      .exec();

    if (quizProgress) {
      throw new NotFoundException('The quiz has already been attempted.');
    }

    return quiz;
  }

  async startQuiz(
    level: string,
    lessonTitle: string,
    quizId: string,
    userId: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    const quizProgress = new this.quizProgressModel({
      user: userId,
      quiz: quizId,
      level,
      lessonTitle,
      isAttempted: true,
      isCompleted: false,
      score: 0,
      startTime: new Date(),
    });

    await quizProgress.save();

    return { success: true, message: 'Quiz started.' };
  }

  async endQuiz(
    userId: string,
    quizId: string,
    userAnswers: UserAnswer[],
  ): Promise<QuizResult> {
    try {
      const quizProgress = await this.quizProgressModel.findOne({
        user: userId,
        quiz: quizId,
        isAttempted: true,
        isCompleted: false,
      });

      if (!quizProgress) {
        throw new NotFoundException('Quiz progress not found.');
      }

      const quiz = await this.quizModel.findById(quizId).populate('questions');

      if (!quiz) {
        throw new NotFoundException('Quiz not found.');
      }

      const score = this.calculateScore(
        quiz.questions as Question[],
        userAnswers,
      );

      const endTime = new Date();
      const timeTakenInSeconds =
        (endTime.getTime() - quizProgress.startTime.getTime()) / 1000;

      const formattedTimeTaken = this.formatTimeTaken(timeTakenInSeconds);

      quizProgress.score = score;
      quizProgress.timeTaken = formattedTimeTaken;
      quizProgress.isCompleted = true;
      quizProgress.userAnswers = userAnswers;

      await quizProgress.save();

      return {
        startTime: quizProgress.startTime,
        _id: quiz._id,
        timeTaken: formattedTimeTaken,
        score,
        userAnswers,
        questions: quiz.questions as Question[],
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to end quiz.');
    }
  }

  async getQuizResult(userId: string, quizId: string): Promise<QuizResult> {
    const quizResult = await this.retrieveQuizResult(userId, quizId);

    if (!quizResult) {
      console.log('Quiz result not found.');
      throw new NotFoundException('Quiz result not found.');
    }
    return quizResult;
  }

  private async retrieveQuizResult(
    userId: string,
    quizId: string,
  ): Promise<QuizResult> {
    try {
      const quizProgress = await this.quizProgressModel
        .findOne({
          user: userId,
          quiz: quizId,
          isAttempted: true,
          isCompleted: true,
        })
        .populate({
          path: 'quiz',
          populate: { path: 'questions', model: 'QuizQuestion' },
        });

      if (!quizProgress) {
        throw new NotFoundException('Quiz result not found.');
      }

      // @ts-ignore
      const questions = quizProgress.quiz.questions as Question[];
      const userAnswers = quizProgress.userAnswers;

      const startTime = quizProgress.startTime;

      const endTime = new Date();
      const timeTakenInSeconds =
        (endTime.getTime() - startTime.getTime()) / 1000;

      const score = this.calculateScore(questions, userAnswers);

      const formattedTimeTaken = this.formatTimeTaken(timeTakenInSeconds);

      return {
        _id: quizProgress._id,
        questions,
        userAnswers,
        timeTaken: formattedTimeTaken,
        score,
        startTime,
      };
    } catch (error) {
      throw new NotFoundException('Quiz result not found.');
    }
  }

  private formatTimeTaken(timeInSeconds: number): string {
    if (timeInSeconds <= 60) {
      return `${timeInSeconds} seconds`;
    }

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes} minutes ${seconds} seconds`;
  }

  private calculateScore(
    questions: Question[],
    userAnswers: UserAnswer[],
  ): number {
    let score = 0;
    for (const userAnswer of userAnswers) {
      const question = this.findQuestionById(questions, userAnswer.questionId);
      if (question?.answer === userAnswer.userAnswer) {
        score++;
      }
    }
    return score;
  }

  private findQuestionById(
    questions: Question[],
    questionId: string,
  ): Question | undefined {
    return questions.find((q) => q._id.toString() === questionId);
  }
}
