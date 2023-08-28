import { IsString, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Level } from '../../auth/entities/user.entity';
import { LessonTitle } from '../../learn/entities/word.entity';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Title of the quiz',
    example: 'Quiz 1',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Level of the quiz',
    enum: Level,
    enumName: 'Level',
    example: Level.BEGINNER,
  })
  @IsNotEmpty()
  @IsEnum(Level)
  level: Level;

  @ApiProperty({
    description: 'Lesson title for the quiz',
    enum: LessonTitle,
    enumName: 'LessonTitle',
    example: LessonTitle.PERSONAL_INFORMATION,
  })
  @IsNotEmpty()
  @IsEnum(LessonTitle)
  lessonTitle: LessonTitle;

  @ApiProperty({
    description: 'Time limit for the quiz in minutes',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  timeLimit: number;

  @ApiProperty({
    description: 'Number of questions in the quiz',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  numberOfQuestions: number;
}
