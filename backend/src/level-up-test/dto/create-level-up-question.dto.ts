import { Level } from '../../auth/entities/user.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LessonTitle } from '../../learn/entities/word.entity';

export class CreateLevelUpQuestionDto {
  @ApiProperty({ description: 'The text of the question' })
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @ApiProperty({
    description: 'An array of options with their IDs and text',
    type: [Object],
    example: [{ id: 1, optionText: 'Option A' }],
  })
  @IsNotEmpty()
  options: { id: number; optionText: string }[];

  @ApiProperty({
    description: 'The ID of the correct answer option',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  correctAnswer: number;

  @ApiProperty({
    description: 'The difficulty level of the question',
    enum: Level,
    enumName: 'Level',
  })
  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @ApiProperty({
    description: 'The lesson title of the question',
  })
  @IsNotEmpty()
  @IsEnum(LessonTitle)
  lessonTitle: LessonTitle;
}
