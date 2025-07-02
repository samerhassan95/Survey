import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Section } from '../sections/section.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Section)
    private sectionRepo: Repository<Section>,
  ) {}

  async create(sectionId: string, dto: CreateQuestionDto): Promise<Question> {
    const section = await this.sectionRepo.findOneByOrFail({ id: sectionId });
    const question = this.questionRepo.create({ ...dto, section });
    return this.questionRepo.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepo.find({ relations: ['section'] });
  }

  async findOne(id: string): Promise<Question> {
    return this.questionRepo.findOneOrFail({
      where: { id },
      relations: ['section'],
    });
  }

  async update(id: string, dto: UpdateQuestionDto): Promise<Question> {
    const question = await this.findOne(id);
    Object.assign(question, dto);
    return this.questionRepo.save(question);
  }

  async remove(id: string): Promise<void> {
    await this.questionRepo.delete(id);
  }
}
