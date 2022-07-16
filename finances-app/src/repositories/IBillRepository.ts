import { Bill } from 'src/entities/billEntity';

export interface IBillRepository {
  createBill(bill: Bill): Promise<Bill>;

  updateBill(
    id: string,
    bill: {
      Barcode?: string;
      Price?: number;
      Title?: string;
      ExpirationDate?: Date;
      IsPaid?: boolean;
    },
  ): Promise<Bill>;

  findBillById(id: string): Promise<Bill>;

  delete: Promise<Bill>;
}
