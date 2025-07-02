// src/sections/sections.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { Survey } from '../surveys/surveys.entity';
import { Question } from 'src/questions/question.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private sectionRepo: Repository<Section>,
    @InjectRepository(Survey)
    private surveyRepo: Repository<Survey>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
  ) {}

  async create(surveyId: string, dto: CreateSectionDto) {
    const survey = await this.surveyRepo.findOne({ where: { id: surveyId } });
    if (!survey) throw new NotFoundException('Survey not found');

    const section = this.sectionRepo.create({
      title: dto.title,
      survey,
      questions: [],
    });

    for (const questionDto of dto.questions) {
      const question = this.questionRepo.create({
        question_text: questionDto.question_text,
        type: questionDto.type,
        settings: questionDto.settings,
        section, // ✅ attach parent!
      });

      section.questions.push(question);
    }

    return this.sectionRepo.save(section);
  }

  async findAll() {
    return this.sectionRepo.find({ relations: ['survey', 'questions'] });
  }

  async findOne(id: string) {
    return this.sectionRepo.findOne({
      where: { id },
      relations: ['survey', 'questions'],
    });
  }
}
