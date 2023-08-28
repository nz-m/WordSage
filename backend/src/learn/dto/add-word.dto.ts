import { IsString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { LessonTitle } from '../entities/word.entity';
import { Level } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AddWordDto {
  @ApiProperty({ description: 'The word number' })
  @IsNotEmpty()
  @IsNumber()
  wordNumber: number;

  @ApiProperty({ description: 'The word' })
  @IsNotEmpty()
  @IsString()
  word: string;

  @ApiProperty({ description: 'The meaning of the word' })
  @IsNotEmpty()
  @IsString()
  meaning: string;

  @ApiProperty({ description: 'The part of speech of the word' })
  @IsString()
  partOfSpeech: string;

  @ApiProperty({ description: 'An example usage of the word' })
  @IsNotEmpty()
  @IsString()
  example: string;

  @ApiProperty({ description: 'A synonym of the word' })
  @IsString()
  synonym: string;

  @ApiProperty({ description: 'The lesson title of the word' })
  @IsNotEmpty()
  @IsEnum(LessonTitle)
  lessonTitle: LessonTitle;

  @ApiProperty({ description: 'The level of the word' })
  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;
}
