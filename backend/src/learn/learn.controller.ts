import { Controller, Post, UseGuards, Req, Body, Get } from '@nestjs/common';
import { LearnService } from './learn.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { LessonToSend } from './interface/lessonToSend.interface';
import { UserToSend } from '../auth/interface/user.interface';
import { AddWordDto } from './dto/add-word.dto';

@Controller('learn')
export class LearnController {
  constructor(private learnService: LearnService) {}
  @Post('create-lessons')
  createLessons(
    @Body() lessons: CreateLessonsDto[],
  ): Promise<{ success: boolean; message: string }> {
    return this.learnService.createLessons(lessons);
  }

  @UseGuards(AuthGuard())
  @Get('get-lessons')
  getLessons(@Req() req): Promise<LessonToSend[]> {
    return this.learnService.getLessons(req.user._id);
  }

  @UseGuards(AuthGuard())
  @Post('start')
  startLearning(
    @Req() req,
  ): Promise<{ user: UserToSend } | { message: string }> {
    return this.learnService.startLearning(req.user._id);
  }

  @Post('add-words')
  async createWords(
    @Body() words: AddWordDto | AddWordDto[],
  ): Promise<{ success: boolean; message: string }> {
    if (Array.isArray(words)) {
      return this.learnService.addWords(words);
    } else {
      return this.learnService.addWord(words);
    }
  }

  @UseGuards(AuthGuard())
  @Post('start-lesson')
  async startLesson(
    @Req() req,
    @Body() body: { lessonId: string },
  ): Promise<LessonToSend[] | { success: boolean; message: string }> {
    return this.learnService.startLesson(req.user._id, body.lessonId);
  }

  @UseGuards(AuthGuard())
  @Get('get-words/:lessonTitle')
  async getWordsByLessonTitle(@Req() req): Promise<any> {
    return this.learnService.getWordsByLessonTitle(
      req.params.lessonTitle,
      req.user._id,
    );
  }
}
