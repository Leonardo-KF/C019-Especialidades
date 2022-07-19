import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BillModel {
  @Field(() => ID)
  Id: string;
  @Field()
  Title: string;
  @Field()
  Barcode: string;
  @Field()
  Price: number;
  @Field()
  ExpirationDate: Date;
  @Field()
  IsPaid: boolean;
}
