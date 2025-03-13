// create user data transfer object
export class CreateUserDto {
  name: string;
  email: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
