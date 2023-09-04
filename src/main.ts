import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundInterceptor } from './core/interceptors/not-found.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Set up interceptor that evaluates if a response is undefined
  // for a GET / UPDATE / DELETE endpoint, and returns Not Found error
  app.useGlobalInterceptors(new NotFoundInterceptor());

  const docConfig = new DocumentBuilder()
    .setTitle('Backend - Aplicación para estudiantes del CUNOC')
    .setDescription(
      'REST API para el proyecto de la nueva aplicación para estudiantes del CUNOC',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  // Order swagger collections alphabetically
  const options = {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  };
  SwaggerModule.setup('apidoc', app, document, options);

  await app.listen(8000);
}
bootstrap();
