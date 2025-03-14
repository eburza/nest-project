import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  // create class, starting with creating a property
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: UserRole.INTERN,
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: UserRole.INTERN,
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: UserRole.ENGINEER,
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: UserRole.ENGINEER,
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: UserRole.ADMIN,
    },
  ];

  // create methods
  // find all users
  findAll(role?: UserRole) {
    if (role) {
      const filteredUsers = this.users.filter((user) => {
        return user.role === role;
      });
      if (filteredUsers.length === 0) {
        throw new NotFoundException(`No users found with role ${role}`);
      }
      return filteredUsers;
    }
    return this.users;
  }

  // find one user
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id); // return user with given id

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // create user
  create(createUserDto: CreateUserDto) {
    // generate id as app is not connected to database yet
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  // update user
  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });
    return this.findOne(id); // return only updated user
  }

  //delete user
  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id); // exlude user that needs to be removed

    return removeUser;
  }
}
