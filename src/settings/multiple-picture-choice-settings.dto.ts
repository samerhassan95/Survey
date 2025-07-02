import { IsArray, ArrayMinSize, IsUrl } from 'class-validator';

export class MultiplePictureChoiceSettingsDto {
  @IsArray()
  @ArrayMinSize(2)
  @IsUrl({}, { each: true })
  imageChoices: string[];
}
