import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Level } from '../../auth/entities/user.entity';

@Schema()
export class WordProgress extends Document {
  @Prop({ required: true })
  level: Level;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true })
  word: mongoose.Types.ObjectId;

  @Prop({ required: true })
  lessonTitle: string;

  @Prop({ required: true })
  isLearned: boolean;
}

export const WordProgressSchema = SchemaFactory.createForClass(WordProgress);
