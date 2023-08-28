import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { LevelUpTestService } from './level-up-test.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateLevelUpQuestionDto, LevelUpTestQuestionDto } from './dto';
import { UserAnswerDto } from '../level-assessment/dto';
import { UserToSend } from '../auth/interface/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('LevelUpTest')
@Controller('level-up-test')
export class LevelUpTestController {
  constructor(private readonly levelUpTestService: LevelUpTestService) {}

  @UseGuards(AuthGuard())
  @Get('get-questions')
  getQuestions(@Req() req): Promise<LevelUpTestQuestionDto[]> {
    return this.levelUpTestService.getQuestions(req.user.level);
  }

  @Post('add-questions')
  addQuestions(
    @Body()
    levelUpTestQuestionDto:
      | CreateLevelUpQuestionDto
      | CreateLevelUpQuestionDto[],
  ): Promise<{ message: string }> {
    if (Array.isArray(levelUpTestQuestionDto)) {
      return this.levelUpTestService.addQuestions(levelUpTestQuestionDto);
    } else {
      return this.levelUpTestService.addQuestion(levelUpTestQuestionDto);
    }
  }

  @Delete('delete-question/:id')
  deleteQuestion(
    @Param('id')
    id: string,
  ): Promise<{ message: string }> {
    return this.levelUpTestService.deleteQuestion(id);
  }

  @UseGuards(AuthGuard())
  @Post('start')
  startTest(@Req() req): Promise<LevelUpTestQuestionDto[]> {
    return this.levelUpTestService.startTest(req.user._id, req.user.level);
  }

  @UseGuards(AuthGuard())
  @Post('assess-test')
  assessTest(
    @Body() userAnswerDto: UserAnswerDto[],
    @Req() req,
  ): Promise<{ scorePercentage: number; userData: UserToSend }> {
    return this.levelUpTestService.assessTest(
      userAnswerDto,
      req.user._id,
      req.user.level,
    );
  }
}
