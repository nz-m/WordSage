import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {
  Quiz,
  QuizSchema,
  QuizQuestion,
  QuizQuestionSchema,
  QuizProgress,
  QuizProgressSchema,
} from './entities';
import { User, UserSchema } from '../auth/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: QuizQuestion.name, schema: QuizQuestionSchema },
      { name: QuizProgress.name, schema: QuizProgressSchema },
      { name: User.name, schema: UserSchema },
    ]),
    AuthModule,
  ],

  providers: [QuizService],
  controllers: [QuizController],
})
export class QuizModule {}
