import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

@Schema()
export class LevelUpTestQuestion extends Document {
  @Prop({ required: true, unique: true })
  questionText: string;

  @Prop({
    type: [
      {
        id: { type: Number, enum: [1, 2, 3, 4], required: true },
        optionText: { type: String, required: true },
      },
    ],
    validate: {
      validator: function (options) {
        return options.length === 4;
      },
      message: 'There must be exactly 4 options for a question.',
    },
  })
  options: { id: number; optionText: string }[];

  @Prop({ required: true })
  correctAnswer: number;

  @Prop({ required: true, enum: Level })
  level: Level;

  @Prop({ required: true, enum: LessonTitle })
  lessonTitle: LessonTitle;
}

export const LevelUpTestQuestionSchema =
  SchemaFactory.createForClass(LevelUpTestQuestion);
