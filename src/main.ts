import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      validatorPackage: require('class-validator'),
      transformerPackage: require('class-transformer'),
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST',
    allowedHeaders: 'Authorization, Access-Control-Allow-Origin, content-type',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('proyecto de induccion')
    .setVersion('1.0.0')
    .setDescription('induccion a nestJS')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
        name: 'authorization',
        in: 'header',
      },
      'access-token',
    )
    .setExternalDoc('Documentacion de serviceNOW', 'docs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();
