import { IsInt, Min } from 'class-validator';

export class RatingSettingsDto {
  @IsInt()
  @Min(1)
  scale: number;
}
