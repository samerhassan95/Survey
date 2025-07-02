import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateThemeDto {
  @ApiProperty({ example: '#ff0000', description: 'Primary color in hex' })
  @IsString()
  @IsNotEmpty()
  primary_color: string;

  @ApiProperty({ example: '#00ff00', description: 'Secondary color in hex' })
  @IsString()
  @IsNotEmpty()
  secondary_color: string;

  @ApiProperty({ example: 'Arial', description: 'Font family name' })
  @IsString()
  @IsNotEmpty()
  font_family: string;
}
