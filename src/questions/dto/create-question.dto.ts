import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type, TypeHelpOptions } from 'class-transformer';
import { QuestionType } from '../question.entity';
import { RatingSettingsDto } from '../../settings/rating-settings.dto';
import { MultipleChoiceSettingsDto } from '../../settings/multiple-choice-settings.dto';
import { MultiplePictureChoiceSettingsDto } from '../../settings/multiple-picture-choice-settings.dto';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question_text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsOptional()
  translations?: Record<string, string>;

  @ValidateNested()
  @Type((options: TypeHelpOptions) => {
    const dto = options?.object as CreateQuestionDto;

    switch (dto?.type) {
      case QuestionType.RATING:
        return RatingSettingsDto;
      case QuestionType.MULTIPLE_CHOICE:
        return MultipleChoiceSettingsDto;
      case QuestionType.MULTIPLE_PICTURE_CHOICE:
        return MultiplePictureChoiceSettingsDto;
      default:
        return Object;
    }
  })
  settings:
    | RatingSettingsDto
    | MultipleChoiceSettingsDto
    | MultiplePictureChoiceSettingsDto;
}
