import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { Response } from 'express';

@Controller('users') // هذا يشكل الراوت => http://localhost:3000/users
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('/:id')
  getUser(@Param() id: string) {
    
    return this.userService.findOne(id);
  }
}
