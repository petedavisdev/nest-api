import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Eddy',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Iris',
      role: 'INTERN',
    },
  ];

  read(role?: string) {
    if (role) {
      const filteredUsers = this.users.filter((user) => user.role === role);
      if (!filteredUsers.length)
        throw new NotFoundException(`no users found with role: ${role}`);

      return filteredUsers;
    }

    return this.users;
  }

  readOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`user ${id} not found`);

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: usersByHighestId[0].id + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updatedUserDto } : user,
    );

    return this.readOne(id);
  }

  delete(id: number) {
    const removedUser = this.readOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
