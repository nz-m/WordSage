import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class WordProgress extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true })
  word: mongoose.Types.ObjectId;

  @Prop({ required: true })
  isLearned: boolean;
}

export const WordProgressSchema = SchemaFactory.createForClass(WordProgress);
