import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'please enter a first name' })
  @IsNotEmpty({ message: 'this filed is not empty' })
  @Length(2, 50)
  firstName: string;
  @IsString({ message: 'please enter a last name' })
  @IsNotEmpty({ message: 'this filed is not empty' })
  @Length(2, 50)
  lastName: string;
  @IsString()
  @IsEmail()
  email: string;

  @IsString({ message: 'please enter a password' })
  @IsNotEmpty({ message: 'this filed is not empty' })
  @Length(8, 50)
  password: string;
  @IsString({ message: 'please confirm your password' })
  @IsNotEmpty({ message: 'this filed is not empty' })
  @Length(8, 50)
  passwordConfirmation: string;
}
