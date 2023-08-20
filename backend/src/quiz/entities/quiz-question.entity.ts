import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

@Schema()
export class QuizQuestion extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  question: string;

  @Prop({ required: true, trim: true })
  answer: string;

  @Prop({ required: true, trim: true })
  distractor1: string;

  @Prop({ required: true, trim: true })
  distractor2: string;

  @Prop({ required: true, trim: true })
  distractor3: string;

  @Prop({ required: true, enum: Level })
  level: string;

  @Prop({ required: true, enum: LessonTitle })
  lessonTitle: string;
}

export const QuizQuestionSchema = SchemaFactory.createForClass(QuizQuestion);
