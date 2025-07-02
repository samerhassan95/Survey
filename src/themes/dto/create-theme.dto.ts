import { IsNotEmpty, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  @IsNotEmpty()
  primary_color: string;

  @IsString()
  @IsNotEmpty()
  secondary_color: string;

  @IsString()
  @IsNotEmpty()
  font_family: string;
}
