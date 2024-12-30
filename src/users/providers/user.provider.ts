import { Connection } from 'mongoose';
import { UserSchema } from 'src/database/schemas/user.schema';

export const usersProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  //تعمل على إنشاء model في database
];
