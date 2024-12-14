import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
// call the middleware 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
