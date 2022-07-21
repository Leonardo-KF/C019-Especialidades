import { Injectable, NotFoundException } from '@nestjs/common';
import { throws } from 'assert';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/entities/userEntity';
import { IUserRepository } from './IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  findUserById(id: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { Id: id } });
    } catch (err) {
      console.log(err);
    }
  }
  createUser(user: User): Promise<User> {
    try {
      return this.prisma.user.create({ data: user });
    } catch (error) {
      console.log(error);
      throw new Error('fail at creation user');
    }
  }
  update(user: User): Promise<User> {
    try {
      return this.prisma.user.update({
        where: {
          Id: user.Id,
        },
        data: user,
      });
    } catch (error) {
      console.log(error);
      throw new Error('fail at update user');
    }
  }
  Delete(id: string): Promise<User> {
    try {
      return this.prisma.user.delete({ where: { Id: id } });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('User not found');
    }
  }
  findUserByAuth0Id(id: string): Promise<User> {
    try {
      return this.prisma.user.findUnique({ where: { Auth0Id: id } });
    } catch (error) {
      console.log(error);
      throw new NotFoundException('User not found');
    }
  }
}
