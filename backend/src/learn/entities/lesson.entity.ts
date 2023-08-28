import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LessonTitle } from './word.entity';

@Schema()
export class Lesson extends Document {
  @Prop({ required: true, unique: true, enum: LessonTitle })
  title: LessonTitle;

  @Prop({ required: true, unique: true, min: 1, max: 10 })
  lessonNumber: number;

  @Prop({ required: true })
  icon: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Quiz' })
  practiceQuiz: Types.ObjectId;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
