import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Section } from '../sections/section.entity';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  MULTIPLE_PICTURE_CHOICE = 'multiple_picture_choice',
  RATING = 'rating',
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question_text: string;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @Column({ type: 'jsonb' }) // supports dynamic shape
  settings: Record<string, any>;

  @ManyToOne(() => Section, (section) => section.questions, {
    onDelete: 'CASCADE',
  })
  section: Section;
}
