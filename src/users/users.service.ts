import { Injectable } from '@nestjs/common';

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
    return role ? this.users.filter((user) => user.role === role) : this.users;
  }

  readOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: { name: string; role: string }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: usersByHighestId[0].id + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: object) {
    this.users = this.users.map((user) =>
      user.id === id ? { ...user, ...updatedUser } : user,
    );

    return this.readOne(id);
  }

  delete(id: number) {
    const removedUser = this.readOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
