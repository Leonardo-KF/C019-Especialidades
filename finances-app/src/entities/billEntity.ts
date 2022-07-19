export type Bill = {
  Id?: string;
  Barcode: string;
  Price: number;
  Title: string;
  ExpirationDate: Date;
  IsPaid: boolean;
  userId: string;
};
