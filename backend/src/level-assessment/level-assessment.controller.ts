import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LevelAssessmentService } from './level-assessment.service';
import {
  CreateAssessmentQuestionDto,
  AssessmentQuestionDto,
  UserAnswerDto,
} from './dto';
import { QuestionLevel } from './entities/assessment-question.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserToSend } from '../auth/user.interface';

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

  @Post('assess-level')
  @UseGuards(AuthGuard())
  assessLevel(
    @Body() userAnswerDto: UserAnswerDto[],
    @Req() req,
  ): Promise<{
    level: string;
    correctCounts: Record<QuestionLevel, number>;
    scorePercentage: number;
    user: UserToSend;
  }> {
    return this.levelAssessmentService.assessLevel(userAnswerDto, req.user._id);
  }
}
