import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({ example: 'Product Feedback' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [CreateQuestionDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
