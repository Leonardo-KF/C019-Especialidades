import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BillModel } from './bill.model';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  Id: string;
  @Field()
  Salary: number;
  @Field()
  Auth0Id: string;
  @Field(() => [BillModel])
  bills: BillModel[];
}
