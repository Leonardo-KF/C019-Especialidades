import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BillsService } from 'src/services/bills.service';
import { AuthorizationGuard } from './auth/authorization.guard';
import { CreateBillInput } from './graphql/inputs/create-bill.input';
import { BillModel } from './graphql/models/bill.model';

@Resolver()
export class TestResolver {
  constructor(private billsService: BillsService) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [BillModel])
  allBills() {
    return this.billsService.findBills();
  }
  @Mutation(() => BillModel)
  createBill(@Args('data') data: CreateBillInput) {
    return this.billsService.createBill(data);
  }
}
