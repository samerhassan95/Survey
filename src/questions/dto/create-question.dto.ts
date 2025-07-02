import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { QuestionType } from '../question.entity';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question_text: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsObject()
  settings: Record<string, any>;
}
