import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll() {
    return 'hello in users service';
  }
  findOne(id: string) {
    if (id != '123') {
      throw new HttpException('invalid ID', HttpStatus.NOT_FOUND);
    } else {
      return `the user id is :${id}`;
    }
  }
}
