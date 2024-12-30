import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser-dto';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    const payload = { id: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { user: user, token: token };
  }
  async signUp(userBody: CreateUserDto): Promise<any> {
    const user = await this.usersService.create(userBody);
    const { password, ...result } = user;
    return user;
  }


  //get profile of user
  async getMe(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    return user;
  }
}
