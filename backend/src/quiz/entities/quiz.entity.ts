import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

interface QuizQuestion {
  _id: string;
}

@Schema()
export class Quiz extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true, min: 1, max: 20, default: 10 })
  numberOfQuestions: number;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'QuizQuestion' }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 20'],
  })
  questions: QuizQuestion[];

  @Prop({ required: true, enum: LessonTitle })
  lessonTitle: string;

  @Prop({ required: true, enum: Level })
  level: string;

  @Prop({ required: true, default: 5 }) // Default time limit is 5 minutes
  timeLimit: number;
}

function arrayLimit(val) {
  return val.length <= 20;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
