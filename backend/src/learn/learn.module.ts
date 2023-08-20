import { Module } from '@nestjs/common';
import { LearnService } from './learn.service';
import { LearnController } from './learn.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {
  Lesson,
  LessonSchema,
  Word,
  WordSchema,
  WordProgress,
  WordProgressSchema,
  LessonProgress,
  LessonProgressSchema,
} from './entities';

import { User, UserSchema } from '../auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: Word.name, schema: WordSchema },
      { name: WordProgress.name, schema: WordProgressSchema },
      { name: LessonProgress.name, schema: LessonProgressSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],

  providers: [LearnService],
  controllers: [LearnController],
})
export class LearnModule {}
