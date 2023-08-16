import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
import { LessonTitle } from '../entities/word.entity';
import { Level } from '../../auth/entities/user.entity';

export class AddWordDto {
  @IsNotEmpty()
  @IsString()
  word: string;

  @IsNotEmpty()
  @IsString()
  meaning: string;

  @IsString()
  partOfSpeech: string;

  @IsNotEmpty()
  @IsString()
  example: string;

  @IsString()
  synonym: string;

  @IsNotEmpty()
  @IsEnum(LessonTitle)
  lessonTitle: LessonTitle;

  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;
}
