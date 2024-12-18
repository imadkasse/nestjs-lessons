import { Module, ValidationPipe } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe, // add a global pipe in Module
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard, // add a global Guard in Module
    // },
  ],
})
export class UsersModule {}
