import { Injectable } from '@nestjs/common';
import { User } from './interfaces/users';
//  هذا هو المسؤول عن جلب البيانات ويعطيها للcontroller و هذا الأخير يرسلها الى المستخدم
@Injectable()// عبارة عن design pattern 
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      isActive: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      isActive: false,
    },
  ];

  async findAllUsers() {
    return this.users;
  }
  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }
  async create(userInf: User) {
    this.users.push(userInf);
    return userInf;
  }
}
