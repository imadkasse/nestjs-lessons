import { Injectable } from '@nestjs/common';
//هذا الملف يتعامل مع البيانات .
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Word!';
  }
}
