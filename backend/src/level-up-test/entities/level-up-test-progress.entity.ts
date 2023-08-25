import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Level } from '../../auth/entities/user.entity';

@Schema()
export class LevelUpTestProgress extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, default: 0 })
  scorePercentage: number;

  @Prop({ required: true, enum: Level })
  level: Level;

  @Prop({ required: true, default: Date.now() })
  lastTestAttemptDate: Date;
}

export const LevelUpTestProgressSchema =
  SchemaFactory.createForClass(LevelUpTestProgress);
