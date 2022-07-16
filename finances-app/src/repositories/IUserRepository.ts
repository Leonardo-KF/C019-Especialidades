import { User } from '../entities/userEntity';

export interface IUserRepository {
  createUser: Promise<User>;

  update: Promise<User>;

  Delete: Promise<User>;

  findUserByAuth0Id: Promise<User>;
}
