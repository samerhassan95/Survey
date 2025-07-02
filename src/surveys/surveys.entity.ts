import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Theme } from '../themes/theme.entity';
import { Section } from '../sections/section.entity';
import { User } from '../users/user.entity';

@Entity()
export class Survey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Theme, (theme) => theme.surveys, {
    eager: true,
    onDelete: 'SET NULL',
  })
  theme: Theme;

  @OneToMany(() => Section, (s) => s.survey)
  sections: Section[];

  @ManyToOne(() => User, (user) => user.surveys)
  owner: User;
}
