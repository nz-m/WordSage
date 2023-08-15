import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Level } from '../../auth/entities/user.entity';

@Schema()
export class PracticeQuiz extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'QuizQuestion' }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
  })
  questions: mongoose.Types.ObjectId[];

  @Prop({ required: true })
  lesson: number;

  @Prop({ required: true, enum: Level })
  level: string;

  @Prop({ required: true, default: 5 }) // Default time limit is 5 minutes
  timeLimit: number;
}

function arrayLimit(val) {
  return val.length <= 10;
}

export const PracticeQuizSchema = SchemaFactory.createForClass(PracticeQuiz);
