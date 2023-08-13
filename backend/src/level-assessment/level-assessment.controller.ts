import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { LevelAssessmentService } from './level-assessment.service';
import { CreateAssessmentQuestionDto, AssessmentQuestionDto } from './dto';

@Controller('level-assessment')
export class LevelAssessmentController {
  constructor(private levelAssessmentService: LevelAssessmentService) {}

  @Get('get-questions')
  getQuestions(): Promise<AssessmentQuestionDto[]> {
    return this.levelAssessmentService.getQuestions();
  }
  @Post('add-question')
  addQuestion(
    @Body() assessmentQuestionDto: CreateAssessmentQuestionDto,
  ): Promise<{ message: string }> {
    return this.levelAssessmentService.addQuestion(assessmentQuestionDto);
  }

  @Post('add-questions')
  addQuestions(
    @Body() assessmentQuestionDto: CreateAssessmentQuestionDto[],
  ): Promise<{ message: string }> {
    return this.levelAssessmentService.addQuestions(assessmentQuestionDto);
  }

  @Delete('delete-question/:id')
  deleteQuestion(
    @Param('id')
    id: string,
  ): Promise<{ message: string }> {
    return this.levelAssessmentService.deleteQuestion(id);
  }
}
