import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// update user data transfer object
export class UpdateUserDto extends PartialType(CreateUserDto) {
  // PartialType is a helper function that takes a DTO class and returns a new DTO class with all the properties of the original class, but with the types of the properties set to optional
}
