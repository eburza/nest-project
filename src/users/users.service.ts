import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  findAll(role: string) {
    throw new Error('Method not implemented.');
  }
}
