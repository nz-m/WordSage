import { Module } from '@nestjs/common';
import { LevelAssessmentController } from './level-assessment.controller';
import { LevelAssessmentService } from './level-assessment.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssessmentQuestion,
  AssessmentQuestionSchema,
} from './entities/assessment-question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssessmentQuestion.name, schema: AssessmentQuestionSchema },
    ]),
  ],

  controllers: [LevelAssessmentController],
  providers: [LevelAssessmentService],
})
export class LevelAssessmentModule {}
