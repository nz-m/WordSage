import { Level } from '../../auth/entities/user.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssessmentQuestionDto {
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
}
