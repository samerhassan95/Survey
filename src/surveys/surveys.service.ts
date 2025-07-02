import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './surveys.entity';
import { Section } from '../sections/section.entity';
import { Question } from '../questions/question.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { User } from '../users/user.entity';
import { ThemesService } from '../themes/themes.service';
// import * as util from 'util';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey) private surveyRepo: Repository<Survey>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    private themesService: ThemesService,
  ) {}

  async create(dto: CreateSurveyDto, user: User) {
    const theme = await this.themesService.findOne(dto.themeId);
    if (!theme) throw new NotFoundException('Theme not found');

    // Step 1: Save survey first (without sections)
    const survey = this.surveyRepo.create({
      title: dto.title,
      description: dto.description,
      theme,
      owner: user,
    });
    const savedSurvey = await this.surveyRepo.save(survey);

    // Step 2: Loop through sections and save
    for (const sectionDto of dto.sections) {
      const section = this.sectionRepo.create({
        title: sectionDto.title,
        survey: savedSurvey,
      });
      const savedSection = await this.sectionRepo.save(section);

      // Step 3: Save each question with reference to saved section
      for (const questionDto of sectionDto.questions) {
        const question = this.questionRepo.create({
          question_text: questionDto.question_text,
          type: questionDto.type,
          settings: questionDto.settings,
          section: savedSection,
        });
        await this.questionRepo.save(question);
      }
    }

    // Step 4: Return full survey with relations
    return this.surveyRepo.findOne({
      where: { id: savedSurvey.id },
      relations: ['sections', 'sections.questions', 'theme', 'owner'],
    });
  }

  async findOne(id: string) {
    const survey = await this.surveyRepo.findOne({
      where: { id },
      relations: ['sections', 'sections.questions', 'theme', 'owner'],
    });

    if (!survey) throw new NotFoundException('Survey not found');
    return survey;
  }
}
