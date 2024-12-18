import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Create User Name Failed - Invalid id ' })
  id: string;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(['admin', 'user', 'teacher'])
  role: string;

  @IsBoolean()
  isActive: boolean;
}
