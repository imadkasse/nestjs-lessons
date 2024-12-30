import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUser-dto';
import { Request, Response } from 'express';
import { AuthGuard } from './guard/auth.guard';
import { GetIdGuard } from './guard/getId.guard';
import { LoggingInterceptor } from 'src/users/interceptor/logging.interceptor';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto, @Res() res: Response) {
    const result = await this.authService.signUp(body);
    res.status(HttpStatus.CREATED).json({
      message: 'User created successfully.',
      user: result,
    });
  }
  @Post('/login')
  async loginIn(@Body() body: CreateUserDto, @Res() res: Response) {
    // هنا لا يعمل interceptor لوجود @Res
    res.status(HttpStatus.OK).json({
      message: 'Logged in successfully.',
      res: await this.authService.signIn(body.email, body.password),
    });
  }

  @UseGuards(AuthGuard)
  @UseGuards(GetIdGuard)
  @Get('me')
  // يعمل الInterceptor دون عمل res.status(HttpStatus ...
  async getMe(@Req() req) {
    return {
      statusCode: HttpStatus.OK,
      status: 'success',
      message: 'get my profile successfully.',
      user: await this.authService.getMe(req.userId),
    };
  }
}
