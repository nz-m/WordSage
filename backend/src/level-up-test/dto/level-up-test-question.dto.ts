import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

export class LevelUpTestQuestionDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  questionText: string;

  @IsNotEmpty()
  options: { id: number; optionText: string }[];

  @IsNotEmpty()
  @IsNumber()
  correctAnswer: number;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsNotEmpty()
  @IsEnum(LessonTitle)
  lessonTitle: LessonTitle;
}
