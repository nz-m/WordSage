import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserAnswer } from '../interface/quiz.interface';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

@Schema()
export class QuizProgress extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  })
  quiz: string;

  @Prop({
    required: true,
  })
  level: Level;

  @Prop({
    required: true,
  })
  lessonTitle: LessonTitle;

  @Prop({
    required: true,
  })
  userAnswers: UserAnswer[];

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: new Date() })
  startTime: Date;

  @Prop()
  endTime: Date;

  @Prop({ default: '' })
  timeTaken: string;

  @Prop({ default: false })
  isAttempted: boolean;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const QuizProgressSchema = SchemaFactory.createForClass(QuizProgress);
