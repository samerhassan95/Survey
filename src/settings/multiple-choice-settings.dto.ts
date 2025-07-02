import { IsArray, ArrayMinSize, IsString } from 'class-validator';

export class MultipleChoiceSettingsDto {
  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  choices: string[];
}
