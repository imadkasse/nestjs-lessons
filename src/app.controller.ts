import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
//يتعامل مع المستخدم .
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
// يمكنك إضافة controller من خلال terminal .
// nest g co [إسمه]
//ملاحظة تم إضافة [] للفصل فقط لا تضفها في الcmd .
