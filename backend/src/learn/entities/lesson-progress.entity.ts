import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Level } from '../../auth/entities/user.entity';

export enum LessonStatus {
  NOT_STARTED = 'not started',
  IN_PROGRESS = 'in progress',
  LOCKED = 'locked',
  COMPLETED = 'completed',
}

@Schema()
export class LessonProgress extends Document {
  @Prop({ type: String, required: true })
  user: string;

  @Prop({ type: String, required: true })
  lesson: string;

  @Prop({ enum: LessonStatus, default: LessonStatus.NOT_STARTED })
  status: string;

  @Prop({ enum: Level, required: true, default: Level.BEGINNER })
  level: Level;
}

export const LessonProgressSchema =
  SchemaFactory.createForClass(LessonProgress);

LessonProgressSchema.index({ user: 1, lesson: 1, level: 1 }, { unique: true });
