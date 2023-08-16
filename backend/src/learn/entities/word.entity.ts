import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Level } from '../../auth/entities/user.entity';

export enum LessonTitle {
  EVERYDAY_CONVERSATIONS = 'Everyday Conversations',
  PERSONAL_INFORMATION = 'Personal Information',
  HOME_AND_LIVING = 'Home and Living',
  FOOD_AND_DINING = 'Food and Dining',
  TRAVEL_AND_TRANSPORTATION = 'Travel and Transportation',
  HEALTH_AND_WELLNESS = 'Health and Wellness',
  WORK_AND_CAREERS = 'Work and Careers',
  EDUCATION_AND_LEARNING = 'Education and Learning',
  NATURE_AND_ENVIRONMENT = 'Nature and Environment',
  TECHNOLOGY_AND_COMMUNICATION = 'Technology and Communication',
}

@Schema()
export class Word extends Document {
  @Prop({ required: true, unique: true })
  wordNumber: number;

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

  @Prop({ required: true, enum: LessonTitle })
  lessonTitle: string;

  @Prop({ required: true, enum: Level })
  level: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);
