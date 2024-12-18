import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CuPipePipe } from 'src/cu-pipe/cu-pipe.pipe';
import { CreateUserDto } from 'src/dto/create-user.dto/create-user.dto';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './guards/roles.decorator';

@Controller('users') // هذا يشكل الراوت => http://localhost:3000/users
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get() // type the method(GET, POST, PUT, PATCH,DELETE) , you can add route in THE METHOD HTTP => ex: GET('/users/info')
  @Roles(['admin']) //add custom decorator
  @UseGuards(RolesGuard) // add the Guard
  async findAllUsers(@Res() res: Response) {
    res.status(HttpStatus.OK).json({
      message: 'Get all users',
      users: await this.userService.findAllUsers(),
    });
  }
  //you can add parameters like this
  @Get(':id/')
  @HttpCode(201) // to add status code
  // add the pipes to the parameter (id)
  findOne(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    const user = this.userService.findOne(id);

    res.status(HttpStatus.OK).json({
      message: 'Get one user',
      userId: id,
    });
  }

  // add a Custom Pipe
  @Post('/search')
  searchUsers(@Query('name', CuPipePipe) name: string) {
    console.log(`Search for users with name: ${name}`);
  }

  @Post('/create')
  // Body to get request body
  async createUser(
    @Body() createUser: CreateUserDto, //DTO not be run if you don't use the ValidationPipe , must be using ValidationPipe and DTO
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const newUser = await this.userService.create(createUser);
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

  @Post() // to get all query
  findAll(@Query() query) {
    return `This action returns all cats (limit: ${JSON.stringify(query)} items)`;
  }
}
