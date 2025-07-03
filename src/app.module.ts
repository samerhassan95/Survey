import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';
import { SectionsModule } from './sections/sections.module';
import { SurveysModule } from './surveys/surveys.module';
import { ThemesModule } from './themes/themes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    QuestionsModule,
    UsersModule,
    SectionsModule,
    SurveysModule,
    ThemesModule,
    AuthModule,

    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class AppModule {}
