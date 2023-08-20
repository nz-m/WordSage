import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class SubmitQuizAnswerDto {
  @IsString()
  @IsNotEmpty()
  quizId: string;

  @IsArray()
  @IsNotEmpty()
  userAnswers: { questionId: string; userAnswer: string }[];
}
