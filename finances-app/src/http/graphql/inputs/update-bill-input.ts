import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBillInput {
  @Field({ nullable: true })
  Title: string;
  @Field({ nullable: true })
  Barcode: string;
  @Field({ nullable: true })
  Price: number;
  @Field({ nullable: true })
  ExpirationDate: Date;
  @Field({ nullable: true })
  IsPaid: boolean;
  @Field({ nullable: true })
  userId?: string;
}
