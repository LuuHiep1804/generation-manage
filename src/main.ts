import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Generation Manage API')
    .setDescription('The app API')
    .setVersion('1.0')
    .addTag('Genaration Manage API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
