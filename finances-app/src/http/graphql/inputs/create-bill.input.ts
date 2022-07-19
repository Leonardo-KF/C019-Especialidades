import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBillInput {
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
  @Field()
  userId: string;
}
