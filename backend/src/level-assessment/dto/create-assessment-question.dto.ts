import { QuestionLevel } from '../entities/assessment-question.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAssessmentQuestionDto {
  @IsNotEmpty()
  @IsString()
  questionText: string;

  @IsNotEmpty()
  options: { id: number; optionText: string }[];

  @IsNotEmpty()
  @IsNumber()
  correctAnswer: number;

  @IsNotEmpty()
  @IsEnum(QuestionLevel)
  level: QuestionLevel;
}
