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
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';

@Controller('users') // هذا يشكل الراوت => http://localhost:3000/users
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get() // type the method(GET, POST, PUT, PATCH,DELETE) , you can add route in THE METHOD HTTP => ex: GET('/users/info')
  async findAllUsers(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      message: 'Get all users',
      users: await this.userService.findAllUsers(),
    });
  }
  //you can add parameters like this
  @Get(':id/')
  @HttpCode(201) // to add status code
  findOne(@Param('id') id: string, @Res() res: Response) {
    const user = this.userService.findOne(id);

    res.status(HttpStatus.OK).json({
      message: 'Get one user',
      user,
    });
  }

  @Post('/create')
  // Body to get request body
  async createUser(@Body() body, @Req() req: Request, @Res() res: Response) {
    const newUser = await this.userService.create(req.body);
    res.status(HttpStatus.CREATED).json({
      message: 'User created successfully',
      newUser,
    });
  }
  @Patch('/update/:id')
  updateUser(@Param('id') id: string, @Body() body, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      message: 'User updated successfully',
      user: body,
    });
  }
  @Delete('/delete/:id')
  deleteUser(@Param('id') id: string) {
    return `User with ID: ${id} deleted`;
  }

  @Get() // to get all query
  findAll(@Query() query) {
    return `This action returns all cats (limit: ${JSON.stringify(query)} items)`;
  }
}
