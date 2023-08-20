import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { SubmitQuizAnswerDto } from './dto/submit-quiz-answer.dto';
import { QuizQuestionDto } from './dto/quiz-question.dto';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { AuthGuard } from '@nestjs/passport';
import { QuizResult } from './interface/quiz.interface';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('add-question')
  async createQuizQuestions(
    @Body() quizQuestionData: QuizQuestionDto | QuizQuestionDto[],
  ) {
    if (Array.isArray(quizQuestionData)) {
      return await this.quizService.addQuestions(quizQuestionData);
    } else {
      return await this.quizService.addQuestion(quizQuestionData);
    }
  }

  @Post('create')
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return await this.quizService.createQuiz(createQuizDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  async getUnattemptedQuiz(
    @Query('level') level: string,
    @Query('lessonTitle') lessonTitle: string,
    @Req() req,
  ) {
    const userId = req.user._id;
    return await this.quizService.getUnattemptedQuiz(
      level,
      lessonTitle,
      userId,
    );
  }

  @UseGuards(AuthGuard())
  @Post('start')
  async startQuiz(
    @Body('level') level: string,
    @Body('lessonTitle') lessonTitle: string,
    @Body('quizId') quizId: string,
    @Req() req,
  ): Promise<{ success: boolean; message: string }> {
    const userId = req.user._id;
    return await this.quizService.startQuiz(level, lessonTitle, quizId, userId);
  }

  @UseGuards(AuthGuard())
  @Post('end')
  async endQuiz(
    @Body()
    submitQuizAnswerDto: SubmitQuizAnswerDto,
    @Req() req,
  ): Promise<QuizResult> {
    const { quizId, userAnswers } = submitQuizAnswerDto;
    return await this.quizService.endQuiz(req.user._id, quizId, userAnswers);
  }

  @UseGuards(AuthGuard())
  @Get('result/:quizId')
  async getQuizResult(
    @Param('quizId') quizId: string,
    @Req() req,
  ): Promise<QuizResult> {
    const userId = req.user._id;
    return await this.quizService.getQuizResult(userId, quizId);
  }
}
