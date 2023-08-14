import { Module } from '@nestjs/common';
import { LevelAssessmentController } from './level-assessment.controller';
import { LevelAssessmentService } from './level-assessment.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AssessmentQuestion,
  AssessmentQuestionSchema,
} from './entities/assessment-question.entity';
import { User, UserSchema } from '../auth/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AssessmentQuestion.name, schema: AssessmentQuestionSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],

  controllers: [LevelAssessmentController],
  providers: [LevelAssessmentService],
})
export class LevelAssessmentModule {}
