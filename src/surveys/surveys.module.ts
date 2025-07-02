import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { Survey } from './surveys.entity';
import { Section } from '../sections/section.entity';
import { Question } from '../questions/question.entity';
import { ThemesModule } from '../themes/themes.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Section, Question, User]),
    ThemesModule,
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
