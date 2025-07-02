import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from './surveys.entity';
import { Section } from '../sections/section.entity';
import { Question } from '../questions/question.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { User, UserRole } from '../users/user.entity';
import { ThemesService } from '../themes/themes.service';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey) private surveyRepo: Repository<Survey>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private themesService: ThemesService,
  ) {}

  async create(dto: CreateSurveyDto, user: User) {
    const theme = await this.themesService.findOne(dto.themeId);
    if (!theme) throw new NotFoundException('Theme not found');

    const survey = this.surveyRepo.create({
      title: dto.title,
      description: dto.description,
      owner: await this.userRepo.findOneByOrFail({ id: user.id }),
      theme,
    });

    const savedSurvey = await this.surveyRepo.save(survey);

    for (const sectionDto of dto.sections) {
      const section = this.sectionRepo.create({
        title: sectionDto.title,
        survey: savedSurvey,
      });

      const savedSection = await this.sectionRepo.save(section);

      for (const qDto of sectionDto.questions) {
        const question = this.questionRepo.create({
          question_text: qDto.question_text,
          type: qDto.type,
          settings: qDto.settings,
          translations: qDto.translations,
          section: savedSection,
        });

        await this.questionRepo.save(question);
      }
    }

    return this.findOne(savedSurvey.id);
  }

  async findOne(id: string) {
    const survey = await this.surveyRepo.findOne({
      where: { id },
      relations: ['sections', 'sections.questions', 'theme', 'owner'],
    });
    if (!survey) throw new NotFoundException('Survey not found');
    return survey;
  }

  async findAll(user: User) {
    console.log('Current user:', user); // 👈 log this to verify

    if (user.role === UserRole.ADMIN) {
      return this.surveyRepo.find({
        relations: ['sections', 'sections.questions', 'theme', 'owner'],
      });
    }

    return this.surveyRepo.find({
      where: { owner: { id: user.id } }, // 👈 ensure user.id is correct
      relations: ['sections', 'sections.questions', 'theme', 'owner'],
    });
  }

  async update(id: string, dto: UpdateSurveyDto, user: User) {
    const survey = await this.surveyRepo.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!survey) throw new NotFoundException('Survey not found');

    if (survey.owner.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not allowed to update this survey');
    }

    Object.assign(survey, dto);
    return this.surveyRepo.save(survey);
  }

  async remove(id: string, user: User) {
    const survey = await this.surveyRepo.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!survey) throw new NotFoundException('Survey not found');

    if (survey.owner.id !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You are not allowed to delete this survey');
    }

    return this.surveyRepo.remove(survey);
  }
}
