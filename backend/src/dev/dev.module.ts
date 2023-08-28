import { Module } from '@nestjs/common';
import { DevService } from './dev.service';
import { DevController } from './dev.controller';
import { LessonProgress, LessonProgressSchema } from '../learn/entities';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/entities/user.entity';
import { WordProgress, WordProgressSchema } from '../learn/entities';
import {
  QuizProgress,
  QuizProgressSchema,
  Quiz,
  QuizSchema,
} from '../quiz/entities';
import {
  LevelUpTestProgress,
  LevelUpTestProgressSchema,
} from '../level-up-test/entities';
import { Lesson, LessonSchema } from '../learn/entities';
import { Word, WordSchema } from '../learn/entities';
import { QuizQuestion, QuizQuestionSchema } from '../quiz/entities';
import {
  AssessmentQuestion,
  AssessmentQuestionSchema,
} from '../level-assessment/entities/assessment-question.entity';
import {
  LevelUpTestQuestion,
  LevelUpTestQuestionSchema,
} from '../level-up-test/entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LessonProgress.name, schema: LessonProgressSchema },
      { name: WordProgress.name, schema: WordProgressSchema },
      { name: QuizProgress.name, schema: QuizProgressSchema },
      { name: LevelUpTestProgress.name, schema: LevelUpTestProgressSchema },
      { name: Lesson.name, schema: LessonSchema },
      { name: Word.name, schema: WordSchema },
      { name: QuizQuestion.name, schema: QuizQuestionSchema },
      { name: AssessmentQuestion.name, schema: AssessmentQuestionSchema },
      { name: Quiz.name, schema: QuizSchema },
      { name: LevelUpTestQuestion.name, schema: LevelUpTestQuestionSchema },
    ]),
  ],

  providers: [DevService],
  controllers: [DevController],
})
export class DevModule {}
