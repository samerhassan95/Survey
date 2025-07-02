import { Module } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { SectionsController } from './sections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from './section.entity';
import { Survey } from '../surveys/surveys.entity';
import { Question } from 'src/questions/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Survey, Question])],
  providers: [SectionsService],
  controllers: [SectionsController],
  exports: [SectionsService],
})
export class SectionsModule {}
