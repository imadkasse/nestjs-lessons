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
// import { Response } from 'express';

@Controller('users') // هذا يشكل الراوت => http://localhost:3000/users
export class UsersController {
  @Get() // type the method(GET, POST, PUT, PATCH,DELETE) , you can add route in THE METHOD HTTP => ex: GET('/users/info')
  findAllUsers(@Res() res: any) {
    res.status(HttpStatus.OK).json({
      message: 'Get all users',
      users: ['John Doe', 'Jane Doe','kasse imad'],
    });
  }
  //you can add parameters like this
  @Get(':id/')
  @HttpCode(201) // to add status code
  findOne(@Param('id') id: string) {
    return `User with ID: ${id}`;
  }

  @Post('/create')
  // Body to get request body
  createUser(@Body() body) {
    return `User created with data: ${JSON.stringify(body)}`;
  }
  @Patch('/update/:id')
  updateUser(@Param('id') id: string, @Body() body, @Res() res: any) {
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
