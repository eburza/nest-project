// disable no-unsafe-call for decorators because they are not supported by class-validator
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsOptional } from 'class-validator';
import { UserRole } from './create-user.dto';

export class FindAllUsersDto {
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Role must be either INTERN, ENGINEER or ADMIN',
  })
  role?: UserRole;
}
