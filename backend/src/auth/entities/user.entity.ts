import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' })
  level: string;

  @Prop({ default: false })
  isLevelAssessmentTaken: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
