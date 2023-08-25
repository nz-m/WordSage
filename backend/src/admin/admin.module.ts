import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { LessonProgress, LessonProgressSchema } from '../learn/entities';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/entities/user.entity';
import { WordProgress, WordProgressSchema } from '../learn/entities';
import { QuizProgress, QuizProgressSchema } from '../quiz/entities';
import {
  LevelUpTestProgress,
  LevelUpTestProgressSchema,
} from '../level-up-test/entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LessonProgress.name, schema: LessonProgressSchema },
      { name: WordProgress.name, schema: WordProgressSchema },
      { name: QuizProgress.name, schema: QuizProgressSchema },
      { name: LevelUpTestProgress.name, schema: LevelUpTestProgressSchema },
    ]),
  ],

  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
