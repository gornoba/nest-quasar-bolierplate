import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  @Render('index')
  root() {
    //
  }

  @Get('test')
  getHello(): string {
    // throw new BadGatewayException('에러 테스트');
    return this.configService.get('firebase.key');
  }
}
