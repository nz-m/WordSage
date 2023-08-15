import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class QuizProgress extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PracticeQuiz',
    required: true,
  })
  quiz: mongoose.Types.ObjectId;

  @Prop([{ question: String, userAnswer: String }])
  userAnswers: { question: string; userAnswer: string }[];

  @Prop({ default: 0 })
  score: number;

  @Prop({ default: 0 })
  timeTaken: number;

  @Prop({ default: false })
  isAttempted: boolean;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const QuizProgressSchema = SchemaFactory.createForClass(QuizProgress);
