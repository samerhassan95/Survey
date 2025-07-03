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
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { Question } from './question.entity';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post(':sectionId')
  @ApiOperation({
    summary: 'Create a question under a section',
    description: 'Creates a new question and assigns it to the given section.',
  })
  @ApiParam({
    name: 'sectionId',
    description: 'UUID of the section to which the question belongs',
    example: 'eb3e6faf-af98-4b4e-9763-041c3b9000fc',
  })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
    type: Question,
  })
  @ApiResponse({
    status: 404,
    description: 'Section not found',
  })
  create(
    @Param('sectionId') sectionId: string,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionsService.create(sectionId, dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all questions',
    description: 'Retrieves a list of all questions across all sections.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of questions retrieved successfully',
    type: [Question],
  })
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a question by ID',
    description: 'Retrieves a single question by its unique identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the question to retrieve',
    example: 'a64d6f4d-b4e1-4c9f-bf4b-1c64f77288f3',
  })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved successfully',
    type: Question,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a question',
    description: 'Updates the properties of an existing question.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the question to update',
  })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
    type: Question,
  })
  @ApiResponse({ status: 404, description: 'Question not found' })
  update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a question',
    description: 'Removes a question by its ID from the database.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID of the question to delete',
  })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
