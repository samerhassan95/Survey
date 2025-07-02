import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Survey Builder API')
    .setDescription('API documentation for the dynamic survey builder system')
    .setVersion('1.0')
    .addBearerAuth() // JWT token support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // <== THIS LINE enables /api/docs

  await app.listen(3000);
}
bootstrap();
