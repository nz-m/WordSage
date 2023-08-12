import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { LevelAssessmentService } from './level-assessment.service';
import { AssessmentQuestionDto } from './dto/assessment-question.dto';

@Controller('level-assessment')
export class LevelAssessmentController {
  constructor(private levelAssessmentService: LevelAssessmentService) {}

  @Get('get-questions')
  getQuestions(): Promise<AssessmentQuestionDto[]> {
    return this.levelAssessmentService.getQuestions();
  }
  @Post('add-question')
  addQuestion(
    @Body() assessmentQuestionDto: AssessmentQuestionDto,
  ): Promise<{ message: string }> {
    return this.levelAssessmentService.addQuestion(assessmentQuestionDto);
  }

  @Post('add-questions')
  addQuestions(
    @Body() assessmentQuestionDto: AssessmentQuestionDto[],
  ): Promise<{ message: string }> {
    return this.levelAssessmentService.addQuestions(assessmentQuestionDto);
  }

  @Delete('delete-question/:sl')
  deleteQuestion(@Param('sl') sl: number): Promise<{ message: string }> {
    return this.levelAssessmentService.deleteQuestion(sl);
  }
}
