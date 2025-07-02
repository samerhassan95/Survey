// src/sections/sections.controller.ts
import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('sections')
@UseGuards(JwtAuthGuard)
export class SectionsController {
  constructor(private readonly sectionsService: SectionsService) {}

  @Post(':surveyId')
  create(@Param('surveyId') surveyId: string, @Body() dto: CreateSectionDto) {
    return this.sectionsService.create(surveyId, dto);
  }

  @Get()
  findAll() {
    return this.sectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sectionsService.findOne(id);
  }
}
