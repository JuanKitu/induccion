import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('api')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('httpError')
  getHttpError() {
    throw new HttpException(
      {
        meta: {
          url: 'http://localhost:3000/api/hhtpError',
          method: 'GET',
          status: '404',
        },
        errors: [
          {
            message: 'error1',
          },
          { message: 'error2' },
          { message: 'error3' },
        ],
      },
      404,
    );
    //return this.appService.getHello();
  }
}
