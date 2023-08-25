import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/entities/user.entity';
import { LoginRecord, LoginRecordSchema } from './entities/login-record.entity';
import { QuizProgress, QuizProgressSchema } from '../quiz/entities';
import {
  LessonProgress,
  LessonProgressSchema,
  WordProgress,
  WordProgressSchema,
} from '../learn/entities';

import {
  LevelUpTestProgress,
  LevelUpTestProgressSchema,
} from '../level-up-test/entities';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LoginRecord.name, schema: LoginRecordSchema },
      { name: QuizProgress.name, schema: QuizProgressSchema },
      { name: LessonProgress.name, schema: LessonProgressSchema },
      { name: WordProgress.name, schema: WordProgressSchema },
      { name: LevelUpTestProgress.name, schema: LevelUpTestProgressSchema },
    ]),
    AuthModule,
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
