import { Module } from '@nestjs/common';
import { LevelUpTestController } from './level-up-test.controller';
import { LevelUpTestService } from './level-up-test.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LevelUpTestQuestion,
  LevelUpTestQuestionSchema,
  LevelUpTestProgress,
  LevelUpTestProgressSchema,
} from './entities';
import { User, UserSchema } from '../auth/entities/user.entity';
import { LessonProgress, LessonProgressSchema } from '../learn/entities';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LevelUpTestQuestion.name, schema: LevelUpTestQuestionSchema },
      { name: LessonProgress.name, schema: LessonProgressSchema },
      {
        name: LevelUpTestProgress.name,
        schema: LevelUpTestProgressSchema,
      },

      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [LevelUpTestController],
  providers: [LevelUpTestService],
})
export class LevelUpTestModule {}
