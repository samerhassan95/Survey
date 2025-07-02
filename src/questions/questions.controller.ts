import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post(':sectionId')
  @ApiOperation({ summary: 'Create a question under a section' })
  @ApiParam({ name: 'sectionId', description: 'UUID of the section' })
  @ApiResponse({ status: 201, description: 'Question created' })
  create(
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionsService.create(sectionId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all questions' })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the question' })
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
