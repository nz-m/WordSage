import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Level } from '../../auth/entities/user.entity';

@Schema()
export class WordProgress extends Document {
  @Prop({ required: true })
  level: Level;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Word', required: true })
  word: Types.ObjectId;

  @Prop({ required: true })
  lessonTitle: string;

  @Prop({ required: true })
  isLearned: boolean;
}

export const WordProgressSchema = SchemaFactory.createForClass(WordProgress);
