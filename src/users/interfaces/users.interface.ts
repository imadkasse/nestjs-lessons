import { Document } from 'mongoose';

export interface User extends Document {
  readonly firstName: string;
  readonly lastName: number;
  readonly email: string;
  password: string;
  passwordConfirmation: string;
}
