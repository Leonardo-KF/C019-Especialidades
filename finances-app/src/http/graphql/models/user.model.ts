import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Bill } from 'src/entities/billEntity';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  Id: string;
  @Field()
  Salary: number;
  @Field()
  Auth0Id: string;
}
