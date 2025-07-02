import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theme } from './theme.entity';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private themeRepo: Repository<Theme>,
  ) {}

  create(dto: CreateThemeDto) {
    const theme = this.themeRepo.create(dto);
    return this.themeRepo.save(theme);
  }

  findAll() {
    return this.themeRepo.find();
  }

  async findOne(id: string): Promise<Theme> {
    const theme = await this.themeRepo.findOne({ where: { id } });
    if (!theme) throw new NotFoundException('Theme not found');
    return theme;
  }

  async update(id: string, dto: UpdateThemeDto) {
    const theme = await this.findOne(id);
    Object.assign(theme, dto);
    return this.themeRepo.save(theme);
  }

  async remove(id: string) {
    const theme = await this.findOne(id);
    return this.themeRepo.remove(theme);
  }
}
