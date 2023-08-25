import { AuthGuard } from '@nestjs/passport';
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
import { Level } from '../auth/entities/user.entity';
import { UserToSend } from '../auth/interface/user.interface';

@Controller('level-assessment')
export class LevelAssessmentController {
  constructor(
    private readonly levelAssessmentService: LevelAssessmentService,
  ) {}

  @Get('get-questions')
  getQuestions(): Promise<AssessmentQuestionDto[]> {
    return this.levelAssessmentService.getQuestions();
  }
  @Post('add-questions')
  addQuestions(
    @Body()
    assessmentQuestionDto:
      | CreateAssessmentQuestionDto
      | CreateAssessmentQuestionDto[],
  ): Promise<{ message: string }> {
    if (Array.isArray(assessmentQuestionDto)) {
      return this.levelAssessmentService.addQuestions(assessmentQuestionDto);
    } else {
      return this.levelAssessmentService.addQuestion(assessmentQuestionDto);
    }
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
    correctCounts: Record<
      Level.BEGINNER | Level.INTERMEDIATE | Level.ADVANCED,
      number
    >;
    scorePercentage: number;
    user: UserToSend;
  }> {
    return this.levelAssessmentService.assessLevel(userAnswerDto, req.user._id);
  }
}
