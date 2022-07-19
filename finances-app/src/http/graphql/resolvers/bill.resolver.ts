import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BillsService } from 'src/services/bills.service';
import { UsersService } from 'src/services/user.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Auth0Id, CurrentUser } from '../../auth/current-user';
import { CreateBillInput } from '../inputs/create-bill.input';
import { UpdateBillInput } from '../inputs/update-bill-input';
import { BillModel } from '../models/bill.model';

@UseGuards(AuthorizationGuard)
@Resolver()
export class BillResolver {
  constructor(
    private billsService: BillsService,
    private usersService: UsersService,
  ) {}

  @Query(() => [BillModel])
  allBills() {
    return this.billsService.findBills();
  }

  @Mutation(() => BillModel)
  async createBill(
    @Args('data') data: CreateBillInput,
    @CurrentUser() auth0UserId: Auth0Id,
  ) {
    try {
      const user = await this.usersService.findByAuth0Id(auth0UserId.sub);
      return await this.billsService.createBill({ ...data, userId: user.Id });
    } catch {
      const user = await this.usersService.createUser({
        Auth0Id: auth0UserId.sub,
      });
      return await this.billsService.createBill({ ...data, userId: user.Id });
    }
  }

  @Mutation(() => BillModel)
  async updateBill(
    @Args('id') id: string,
    @Args('data') data: UpdateBillInput,
    @CurrentUser() auth0UserId: Auth0Id,
  ) {
    const user = await this.usersService.findByAuth0Id(auth0UserId.sub);
    return await this.billsService.updateBill(id, { ...data, userId: user.Id });
  }

  @Mutation(() => BillModel)
  async deleteBill(@Args('id') id: string) {
    return await this.billsService.deletedBill(id);
  }
}
