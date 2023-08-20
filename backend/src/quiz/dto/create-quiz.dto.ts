import { IsString, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @IsNotEmpty()
  @IsEnum(LessonTitle)
  lessonTitle: LessonTitle;

  @IsNotEmpty()
  @IsNumber()
  timeLimit: number;

  @IsNotEmpty()
  @IsNumber()
  numberOfQuestions: number;
}
