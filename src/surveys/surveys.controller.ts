import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  Req,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Request } from 'express';
import { User, UserRole } from '../users/user.entity';

import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: User;
}

@ApiTags('Surveys')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new survey with nested sections/questions',
  })
  @ApiResponse({ status: 201, description: 'Survey created successfully' })
  async create(@Body() dto: CreateSurveyDto, @Req() req: RequestWithUser) {
    if (!req.user) throw new UnauthorizedException();
    return this.surveysService.create(dto, req.user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get survey with all nested sections and questions',
  })
  @ApiParam({ name: 'id', description: 'Survey UUID' })
  @ApiResponse({ status: 200, description: 'Survey retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.surveysService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all surveys (admin sees all, users see their own)',
  })
  @ApiResponse({ status: 200, description: 'List of surveys' })
  async findAll(@Req() req: RequestWithUser) {
    return this.surveysService.findAll(req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a survey (owner or admin only)' })
  @ApiParam({ name: 'id', description: 'Survey UUID' })
  @ApiResponse({ status: 200, description: 'Survey updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSurveyDto,
    @Req() req: RequestWithUser,
  ) {
    const user = req.user;
    const survey = await this.surveysService.findOne(id);

    if (survey.owner.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Only the owner or an admin can update this survey',
      );
    }

    return this.surveysService.update(id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a survey (owner or admin only)' })
  @ApiParam({ name: 'id', description: 'Survey UUID' })
  @ApiResponse({ status: 200, description: 'Survey deleted successfully' })
  async remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const user = req.user;
    const survey = await this.surveysService.findOne(id);

    if (survey.owner.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException(
        'Only the owner or an admin can delete this survey',
      );
    }

    return this.surveysService.remove(id, req.user);
  }
}
