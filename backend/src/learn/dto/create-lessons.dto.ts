import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLessonsDto {
  @IsNotEmpty()
  @IsNumber()
  lessonNumber: number;
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  icon: string;
}
