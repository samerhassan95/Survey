import { Survey } from 'src/surveys/surveys.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Theme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  primary_color: string;

  @Column()
  secondary_color: string;

  @Column()
  font_family: string;

  @OneToMany(() => Survey, (survey) => survey.theme)
  surveys: Survey[];
}
