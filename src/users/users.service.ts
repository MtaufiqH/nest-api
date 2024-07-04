import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create.users.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Taufiq',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Jane',
      role: 'user',
    },
    {
      id: 3,
      name: 'Jack',
      role: 'user',
    },
    {
      id: 4,
      name: 'Jill',
      role: 'user',
    },

    {
      id: 5,
      name: 'Jim',
      role: 'user',
    },
  ];

  getUsers(role?: Role) {
    if (!role) {
      return this.users;
    } else {
      const roleArray =  this.users.filter((selectedUser) => selectedUser.role === role);
      if (!roleArray.length) {
        throw new NotFoundException();
      }
      return roleArray;
    }
  }

  getUserById(id: number) {
    const selectedUser = this.users.find((user) => user.id === id);
    if (!selectedUser) {
      throw new BadRequestException('User not found');
    }
    return selectedUser;
  }

  addUser(user: CreateUserDto) {
    const highestId = this.users[this.users.length - 1].id;
    const newUser = {
      id: highestId + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  updateUser(id: number, user: UpdateUserDto) {
    const selectedUser = this.users.find(
      (selectedUser) => selectedUser.id === id,
    );

    if (selectedUser) {
      selectedUser.name = user.name;
      selectedUser.role = user.role;
      return selectedUser;
    }
  }

  deleteUser(id: number) {
    const selectedUser = this.users.find(
      (selectedUser) => selectedUser.id === id,
    );

    if (selectedUser) {
      const index = this.users.indexOf(selectedUser);
      this.users.splice(index, 1);
      return selectedUser;
    }
  }
}

export type Role = 'admin' | 'user';
