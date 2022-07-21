import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Auth0Id, CurrentUser } from 'src/http/auth/current-user';
import { BillsService } from 'src/services/bills.service';
import { UsersService } from 'src/services/user.service';
import { UserModel } from '../models/user.model';

@UseGuards(AuthorizationGuard)
@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private usersService: UsersService,
    private billsService: BillsService,
  ) {}

  @Query(() => UserModel)
  async me(@CurrentUser() auth0UserId: Auth0Id) {
    const user = await this.usersService.findByAuth0Id(auth0UserId.sub);
    return user;
  }

  @ResolveField()
  async bills(@Parent() user: UserModel) {
    const bills = await this.billsService.findBillByUser(user.Id);
    return bills;
  }
}
