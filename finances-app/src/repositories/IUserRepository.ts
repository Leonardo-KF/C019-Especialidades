import { User } from '../entities/userEntity';

export interface IUserRepository {
  createUser(user: User): Promise<User>;

  update(user: User): Promise<User>;

  Delete(id: string): Promise<User>;

  findUserByAuth0Id(id: string): Promise<User>;
}
