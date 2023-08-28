import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonsDto {
  @ApiProperty({ description: 'The lesson number' })
  @IsNotEmpty()
  @IsNumber()
  lessonNumber: number;

  @ApiProperty({ description: 'The title of the lesson' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the lesson' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The status of the lesson' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'The icon of the lesson' })
  @IsNotEmpty()
  @IsString()
  icon: string;
}
