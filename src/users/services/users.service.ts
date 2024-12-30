import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/users.interface';
import { CreateUserDto } from '../dto/createUser-dto';
import { UpdateUserDto } from '../dto/updateUser-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-password');
  }
  async update(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    await updatedUser.save();

    return updatedUser;
  }
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }
  async deleteOne(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
          error: 'User not found',
          timestamp: new Date().toISOString(),
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return;
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
}
