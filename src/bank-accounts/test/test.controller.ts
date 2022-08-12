import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('xpto')
  rotaTeste() {
    return 'Xpto';
  }
}
