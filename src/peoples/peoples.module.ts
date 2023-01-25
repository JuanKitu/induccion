import { Module } from '@nestjs/common';
import { PeoplesController } from './controllers/peoples.controller';
import { PeoplesService } from './services/peoples.service';

@Module({
  controllers: [PeoplesController],
  providers: [PeoplesService],
})
export class PeoplesModule {}
