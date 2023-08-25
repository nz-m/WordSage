import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers(): Promise<any> {
    return this.adminService.getAllUsers();
  }
  @Patch('mark-all-lessons-as-completed/:userId/:level')
  markAllLessonsAsCompleted(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.adminService.markAllLessonsAsCompleted(userId, level);
  }

  @Patch('mark-all-lessons-as-not-completed/:userId/:level')
  markAllLessonsAsNotCompleted(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.adminService.markAllLessonsAsNotCompleted(userId, level);
  }

  @Patch('user-level/:userId/:level')
  updateUserLevel(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.adminService.updateUserLevel(userId, level);
  }

  @Patch('user-level-assessed-status/:userId/:status')
  updateUserLevelAssessedStatus(
    @Param('userId') userId: string,
    @Param('status') status: boolean,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.adminService.updateUserLevelAssessedStatus(userId, status);
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
    return this.adminService.markALlWordsAsLearned(userId, level, lessonTitle);
  }

  @Delete('test-restriction/:userId/:level')
  removeTestRestriction(
    @Param('userId') userId: string,
    @Param('level') level: string,
  ): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.adminService.removeTestRestriction(userId, level);
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
    return this.adminService.removeQuizProgress(userId, level, lessonTitle);
  }
}
