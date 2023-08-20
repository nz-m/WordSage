import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

export class QuizQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsString()
  @IsNotEmpty()
  distractor1: string;

  @IsString()
  @IsNotEmpty()
  distractor2: string;

  @IsString()
  @IsNotEmpty()
  distractor3: string;

  @IsEnum(Level)
  @IsNotEmpty()
  level: Level;

  @IsEnum(LessonTitle)
  @IsNotEmpty()
  lessonTitle: LessonTitle;
}
