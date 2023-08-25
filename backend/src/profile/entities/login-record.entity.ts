import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class LoginRecord extends Document {
  @Prop({ type: Date, required: true })
  lastLogin: Date;

  @Prop({ type: Number, default: 1 })
  currentStreak: number;

  @Prop({ type: Number, default: 1 })
  longestStreak: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const LoginRecordSchema = SchemaFactory.createForClass(LoginRecord);
