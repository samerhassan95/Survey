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
import { UpdateThemeDto } from './dto/update-theme.dto';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Themes')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new theme',
    description:
      'Allows authenticated users to create a custom theme for surveys.',
  })
  @ApiBody({ type: CreateThemeDto })
  @ApiResponse({
    status: 201,
    description: 'Theme created successfully and returned.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized if JWT token is missing or invalid.',
  })
  create(@Body() dto: CreateThemeDto) {
    return this.themesService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all themes',
    description: 'Fetches a list of all available themes.',
  })
  @ApiResponse({
    status: 200,
    description: 'An array of theme objects.',
  })
  findAll() {
    return this.themesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a theme by ID',
    description: 'Fetch a single theme using its unique ID.',
  })
  @ApiParam({ name: 'id', description: 'UUID of the theme to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Theme found and returned.',
  })
  @ApiResponse({
    status: 404,
    description: 'Theme not found.',
  })
  findOne(@Param('id') id: string) {
    return this.themesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a theme',
    description: 'Allows authenticated users to update a theme by its ID.',
  })
  @ApiParam({ name: 'id', description: 'UUID of the theme to update' })
  @ApiBody({ type: UpdateThemeDto })
  @ApiResponse({
    status: 200,
    description: 'Theme updated successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Theme not found.',
  })
  update(@Param('id') id: string, @Body() dto: UpdateThemeDto) {
    return this.themesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a theme',
    description: 'Allows authenticated users to delete a theme by its ID.',
  })
  @ApiParam({ name: 'id', description: 'UUID of the theme to delete' })
  @ApiResponse({
    status: 200,
    description: 'Theme deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Theme not found.',
  })
  remove(@Param('id') id: string) {
    return this.themesService.remove(id);
  }
}
