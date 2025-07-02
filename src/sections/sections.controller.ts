import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Sections')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post(':surveyId')
  @ApiOperation({ summary: 'Create a section and attach it to a survey' })
  @ApiParam({ name: 'surveyId', description: 'UUID of the parent survey' })
  @ApiResponse({ status: 201, description: 'Section created' })
  create(@Param('surveyId') surveyId: string, @Body() dto: CreateSectionDto) {
    return this.sectionsService.create(surveyId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all sections' })
  @ApiResponse({ status: 200, description: 'All sections' })
  findAll() {
    return this.sectionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get section by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the section' })
  @ApiResponse({ status: 200, description: 'Section found' })
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }
}
