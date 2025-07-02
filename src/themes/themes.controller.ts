import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { UpdateThemeDto } from './dto/update-theme.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new theme' })
  @ApiResponse({ status: 201, description: 'Theme created successfully' })
  create(@Body() dto: CreateThemeDto) {
    return this.themesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all themes' })
  @ApiResponse({ status: 200, description: 'List of all themes' })
  findAll() {
    return this.themesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a theme by ID' })
  @ApiResponse({ status: 200, description: 'Theme found' })
  findOne(@Param('id') id: string) {
    return this.themesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a theme' })
  update(@Param('id') id: string, @Body() dto: UpdateThemeDto) {
    return this.themesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a theme' })
  remove(@Param('id') id: string) {
    return this.themesService.remove(id);
  }
}
