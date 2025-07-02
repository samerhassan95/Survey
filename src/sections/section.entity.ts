import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Survey } from '../surveys/surveys.entity';
import { Question } from '../questions/question.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Survey, (s) => s.sections, { onDelete: 'CASCADE' })
  survey: Survey;

  @OneToMany(() => Question, (q) => q.section, {
    cascade: false,
    eager: false,
  })
  questions: Question[];
}
