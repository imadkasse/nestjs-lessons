import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { CuPipePipe } from './cu-pipe/cu-pipe.pipe';

@Module({
  imports: [UsersModule], // import the modules like UsersModule
  controllers: [AppController],
  providers: [AppService, CuPipePipe],
})
export class AppModule {}
