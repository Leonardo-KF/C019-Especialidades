import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/userEntity';
import { UserRepository } from 'src/repositories/UserRepositoryPostgres';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async createUser(user: User) {
    return await this.userRepository.createUser(user);
  }
  async updateUser(user: User) {
    return await this.userRepository.update(user);
  }
  async deleteUser(id: string) {
    return await this.userRepository.Delete(id);
  }
  async findByAuth0Id(id: string) {
    const user = await this.userRepository.findUserByAuth0Id(id);

    return user;
  }
}
