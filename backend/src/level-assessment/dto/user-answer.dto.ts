import { IsString, IsNumber } from 'class-validator';

export class UserAnswerDto {
  @IsString()
  questionId: string;

  @IsNumber()
  selectedAnswer: number;
}
