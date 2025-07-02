import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSectionDto } from '../../sections/dto/create-section.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSurveyDto {
  @ApiProperty({ example: 'Customer Feedback Survey' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Survey to evaluate customer satisfaction' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 'cf82b827-9f6d-4f5e-b7e6-bab0207ec623',
    description: 'Theme ID',
  })
  @IsUUID()
  themeId: string;

  @ApiProperty({ type: [CreateSectionDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDto)
  sections: CreateSectionDto[];
}
