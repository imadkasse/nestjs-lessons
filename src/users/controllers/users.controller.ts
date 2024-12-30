import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dto/createUser-dto';
import { UpdateUserDto } from '../dto/updateUser-dto';
import { Roles } from '../guards/Roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(['admin', 'manager'])
  @Get()
  async getAllUsers(@Req() req: Request, @Res() res: Response) {
    const users = await this.usersService.findAll();
    res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'All users fetched successfully.',
      resault: users.length,
      users,
    });
  }
  @Post()
  async createUser(
    @Body(new ValidationPipe()) body: CreateUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    res.status(HttpStatus.CREATED).json({
      message: 'User created successfully.',
      user: await this.usersService.create(body),
    });
  }

  @Roles(['admin', 'manager'])
  @Patch(':id')
  async updateUser(
    @Body(new ValidationPipe()) body: UpdateUserDto,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.update(body, id);

    res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'User updated successfully.',
      user: updatedUser,
    });
  }

  @Roles(['admin', 'manager'])
  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = await this.usersService.findOne(id);
    res.status(HttpStatus.OK).json({
      status: 'success',
      message: 'User fetched successfully.',
      user,
    });
  }

  @Roles(['admin'])
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.deleteOne(id);
    res.status(HttpStatus.NO_CONTENT).json({
      status: 'success',
      message: 'User deleted successfully.',
    });
  }
}
