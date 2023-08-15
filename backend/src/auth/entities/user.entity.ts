import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export enum Level {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
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

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'UserWordProgress' }])
  wordProgress: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
