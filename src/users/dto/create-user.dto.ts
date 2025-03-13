// disable no-unsafe-call for decorators because they are not supported by class-validator
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export enum UserRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN',
}

// create user data transfer object
export class CreateUserDto {
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsEmail(undefined, {
    message: 'Email must be a valid email address',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  email: string;

  @IsEnum(UserRole, {
    message: 'Role must be either INTERN, ENGINEER or ADMIN',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  @Transform(({ value }) => value?.toUpperCase())
  @IsNotEmpty()
  role: UserRole;
}
