import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsBoolean()
  @IsNotEmpty()
  isLevelAssessmentTaken: boolean;
}
