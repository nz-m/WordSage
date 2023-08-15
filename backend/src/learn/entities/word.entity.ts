import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Level } from '../../auth/entities/user.entity';

@Schema()
export class Word extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  word: string;

  @Prop({ required: true, trim: true })
  meaning: string;

  @Prop({ trim: true })
  partOfSpeech: string;

  @Prop({ required: true, trim: true })
  example: string;

  @Prop({ trim: true })
  synonym: string;

  @Prop({ trim: true })
  antonym: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Lesson' })
  lesson: mongoose.Types.ObjectId;

  @Prop({ required: true, enum: Level })
  level: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
