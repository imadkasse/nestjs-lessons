import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders], // يجب عمل export لإستخدامه لاحق في modules أخرى
})
export class DatabaseModule {}
