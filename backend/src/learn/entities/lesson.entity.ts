import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Lesson extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true, min: 1, max: 10 })
  lessonNumber: number;

  @Prop({ required: true })
  icon: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PracticeQuiz' })
  practiceQuiz: mongoose.Types.ObjectId;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
