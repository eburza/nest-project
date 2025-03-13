// disable no-unsafe-call for decorators because they are not supported by class-validator
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum UserRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}
// create user data transfer object
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserRole, {
    message: 'Role must be either INTERN, ENGINEER or ADMIN', // custom error message
  })
  @IsNotEmpty()
  role: UserRole;
}
