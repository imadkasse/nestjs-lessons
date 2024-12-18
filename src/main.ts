import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './users/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());//add a global pipe
  // app.useGlobalGuards(new RolesGuard()); //add a global Guard

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
