import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from './format-response/format-response.interceptor';
import { ConfigService } from '@nestjs/config';
import { ExceptionsFilter } from './filter/exception.filter';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*const { server } =
    app.get<ConfigService>(ConfigService)['internalConfig']['config'];*/
  const { server, swagger, project } = config();
  app.useGlobalFilters(new ExceptionsFilter(server.isProd));
  app.useGlobalInterceptors(new FormatResponseInterceptor());
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
  if (swagger.enabled) {
    const config = new DocumentBuilder()
      .setTitle(project.name)
      .setVersion(project.version)
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
  }
  await app.listen(server.port, () => {
    console.log(`App running on: http://localhost:${server.port}`);
  });
}
bootstrap();
