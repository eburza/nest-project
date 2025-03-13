import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  // create class, starting with creating a property
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  // create methods
  // we name the methods after the routes we have in the controller

  // find all users
  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    //check if role is passed
    if (role) {
      return this.users.filter((user) => user.role === role); // onlky return users, with role that wass passed in
    }
    return this.users; // if no role is passed retur all users
  }

  // find one user
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id); // return user with given id
    return user;
  }

  // create user
  create(user: {
    name: string;
    email: string;
    role: 'INTERN' | 'ENGINEER' | 'ADMIN';
  }) {
    // generate id as app is not connected to database yet
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  // update user
  update(
    id: number,
    updatedUser: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updatedUser,
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
