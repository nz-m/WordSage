import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Level {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
  EXPERT = 'Expert',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: Level, default: Level.BEGINNER })
  level: string;

  @Prop({ default: false })
  isLevelAssessed: boolean;

  @Prop({ default: false })
  isLearningStarted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
