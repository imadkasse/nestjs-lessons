import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'please enter a first name' })
  @Length(2, 50)
  firstName: string;
  @IsOptional()
  @IsString({ message: 'please enter a last name' })
  @Length(2, 50)
  lastName: string;
  @IsOptional()
  @IsEmail()
  email: string;
}
