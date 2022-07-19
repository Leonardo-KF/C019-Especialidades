import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Auth0Id, CurrentUser } from 'src/http/auth/current-user';
import { UsersService } from 'src/services/user.service';
import { UserModel } from '../models/user.model';

@UseGuards(AuthorizationGuard)
@Resolver()
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserModel)
  async me(@CurrentUser() auth0UserId: Auth0Id) {
    return await this.usersService.findByAuth0Id(auth0UserId.sub);
  }
}
