import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeoplesModule } from './peoples/peoples.module';
import { ConfigModule } from '@nestjs/config';
import { config, enviroments, validationSchema } from './config';
import * as process from 'process';

@Module({
  imports: [
    PeoplesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: enviroments[`${process.env.NODE_ENV}`],
      ignoreEnvFile:
        process.env.IGNORE_ENV_FILE.toLowerCase() === 'true' || false,
      load: [config],
      validationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
