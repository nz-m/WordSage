import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Quiz, QuizProgress, QuizQuestion } from './entities';
import { User } from '../auth/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { QuizQuestionDto } from './dto/quiz-question.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { Question, QuizResult, UserAnswer } from './interface/quiz.interface';
import { Model } from 'mongoose';

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
      throw new NotFoundException(
        "It appears you've started the quiz but haven't finished it. Feel free to explore other lessons",
      );
    }

    return quiz;
  }

  async startQuiz(
    quizId: string,
    userId: string,
    level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const existingProgress = await this.quizProgressModel.findOne({
        user: userId,
        quiz: quizId,
      });

      if (existingProgress) {
        return { success: false, message: 'Quiz has already been started.' };
      }
      const quiz = await this.quizModel.findById(quizId).exec();
      const lessonTitle = quiz.lessonTitle;

      const quizProgress = new this.quizProgressModel({
        user: userId,
        quiz: quizId,
        level: level,
        isAttempted: true,
        isCompleted: false,
        score: 0,
        startTime: new Date(),
        lessonTitle: lessonTitle,
      });

      await quizProgress.save();

      return { success: true, message: 'Quiz started.' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to start quiz.');
    }
  }

  async endQuiz(
    userId: string,
    quizId: string,
    userAnswers: UserAnswer[],
  ): Promise<{ success: boolean; message: string }> {
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

      if (quizProgress.isCompleted) {
        throw new BadRequestException('Quiz has already been completed.');
      }

      const [quiz, endTime] = await Promise.all([
        this.quizModel.findById(quizId).populate('questions').exec(),
        Date.now(),
      ]);

      if (!quiz) {
        throw new NotFoundException('Quiz not found.');
      }

      const score = this.calculateScore(
        quiz.questions as Question[],
        userAnswers,
      );

      const timeTakenInSeconds =
        (endTime - quizProgress.startTime.getTime()) / 1000;
      const formattedTimeTaken = this.formatTimeTaken(timeTakenInSeconds);

      quizProgress.score = score;
      quizProgress.timeTaken = formattedTimeTaken;
      quizProgress.isCompleted = true;
      quizProgress.userAnswers = userAnswers;
      quizProgress.endTime = new Date(endTime);

      await quizProgress.save();

      return { success: true, message: 'Quiz ended.' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to end quiz.');
    }
  }

  async getQuizResult(
    userId: string,
    level: string,
    lessonTitle: string,
  ): Promise<QuizResult> {
    const quizResult = await this.retrieveQuizResult(
      userId,
      level,
      lessonTitle,
    );

    if (!quizResult) {
      throw new NotFoundException('Quiz result not found.');
    }
    return quizResult;
  }

  private async retrieveQuizResult(
    userId: string,
    level: string,
    lessonTitle: string,
  ): Promise<QuizResult> {
    try {
      const quizProgress = await this.quizProgressModel
        .findOne({
          user: userId,
          level: level,
          lessonTitle: lessonTitle,
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
      const endTime = quizProgress.endTime;

      const timeTakenInSeconds =
        (endTime.getTime() - startTime.getTime()) / 1000;

      const score = this.calculateScore(questions, userAnswers);

      const formattedTimeTaken = this.formatTimeTaken(timeTakenInSeconds);
      const formattedStartTime = this.formatStartTime(startTime);

      return {
        _id: quizProgress._id,
        questions,
        userAnswers,
        timeTaken: formattedTimeTaken,
        score,
        startTime: formattedStartTime,
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

  private formatStartTime(startTime: Date): string {
    const date = new Date(startTime);
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    const dateString = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    let suffix;
    if (day % 10 === 1 && day !== 11) {
      suffix = 'st';
    } else if (day % 10 === 2 && day !== 12) {
      suffix = 'nd';
    } else if (day % 10 === 3 && day !== 13) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }
    const timeString = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    return (
      dateString.split(',')[0] +
      suffix +
      ', ' +
      date.getFullYear() +
      ' ' +
      timeString
    );
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

  async getQuizStatus(
    userId: string,
    level: string,
    lessonTitle: string,
  ): Promise<{ message: string; isCompleted: boolean }> {
    try {
      const quizProgress = await this.quizProgressModel.findOne({
        user: userId,
        lessonTitle: lessonTitle,
        level: level,
        isAttempted: true,
        isCompleted: true,
      });

      if (!quizProgress) {
        return { message: 'Quiz not completed.', isCompleted: false };
      }

      return { message: 'Quiz completed.', isCompleted: true };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch quiz status.');
    }
  }
}
