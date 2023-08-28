import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { DevService } from './dev.service';
import { ApiTags } from '@nestjs/swagger';
import { SetupStats } from './interface/setup-stats.interface';
@ApiTags('Dev')
@Controller('dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Get('setup-stats')
  getSetupStats(): Promise<SetupStats> {
    return this.devService.getSetupStats();
  }

  @Get('users')
  getAllUsers(): Promise<any> {
    return this.devService.getAllUsers();
  }
  @Patch('mark-all-lessons-as-completed/:userId/:level')
  markAllLessonsAsCompleted(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.devService.markAllLessonsAsCompleted(userId, level);
  }

  @Patch('mark-all-lessons-as-not-completed/:userId/:level')
  markAllLessonsAsNotCompleted(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.devService.markAllLessonsAsNotCompleted(userId, level);
  }

  @Patch('user-level/:userId/:level')
  updateUserLevel(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.devService.updateUserLevel(userId, level);
  }

  @Patch('user-level-assessed-status/:userId/:status')
  updateUserLevelAssessedStatus(
    @Param('userId') userId: string,
    @Param('status') status: boolean,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.devService.updateUserLevelAssessedStatus(userId, status);
  }

  @Patch('mark-all-words-as-learned/:userId/:level/:lessonTitle')
  markALlWordsAsLearned(
    @Param('userId') userId: string,
    @Param('level') level: string,
    @Param('lessonTitle') lessonTitle: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.devService.markALlWordsAsLearned(userId, level, lessonTitle);
  }

  @Delete('test-restriction/:userId/:level')
  removeTestRestriction(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.devService.removeTestRestriction(userId, level);
  }

  @Delete('quiz-progress/:userId/:level/:lessonTitle')
  removeQuizProgress(
    @Param('userId') userId: string,
    @Param('level') level: string,
    @Param('lessonTitle') lessonTitle: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.devService.removeQuizProgress(userId, level, lessonTitle);
  }
}
