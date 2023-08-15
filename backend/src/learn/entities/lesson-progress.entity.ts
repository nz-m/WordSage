import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LessonStatus {
  NOT_STARTED = 'not started',
  ONGOING = 'ongoing',
  LOCKED = 'locked',
  COMPLETE = 'complete',
}

@Schema()
export class LessonProgress extends Document {
  @Prop({ type: String, required: true })
  user: string;

  @Prop({ type: String, required: true })
  lesson: string;

  @Prop({ enum: LessonStatus, default: LessonStatus.NOT_STARTED })
  status: string;
}

export const LessonProgressSchema =
  SchemaFactory.createForClass(LessonProgress);

LessonProgressSchema.index({ user: 1, lesson: 1 }, { unique: true });
