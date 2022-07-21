import { Bill } from 'src/entities/billEntity';
import { IBillRepository } from './IBillRepository';
import { bills } from '../mocks/bills';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';

export class BillRepositoryInMemory implements IBillRepository {
  findBillsByExpirationIsToDay(): Promise<Bill[]> {
    throw new Error('Method not implemented.');
  }
  findBillsByUser(userId: string): Promise<Bill[]> {
    throw new Error('Method not implemented.');
  }
  findAllBills(): Promise<Bill[]> {
    return Promise.resolve(bills);
  }
  createBill(bill: Bill): Promise<Bill> {
    try {
      bill.Id = randomUUID();
      bills.push(bill);
      return Promise.resolve(bill);
    } catch (error) {
      console.log(error);
      throw new Error('fail at creation bill');
    }
  }
  updateBill(
    id: string,
    updatedBillParams: {
      Barcode?: string;
      Price?: number;
      Title?: string;
      ExpirationDate?: Date;
      IsPaid?: boolean;
    },
  ): Promise<Bill> {
    const newBillList = bills;
    let billIndex: number;
    newBillList.map((bill, index) => {
      if (bill.Id === id) {
        const updatedBill = bill;
        billIndex = index;
        if (updatedBillParams.Barcode) {
          updatedBill.Barcode = updatedBillParams.Barcode;
        }
        if (updatedBillParams.Price) {
          updatedBill.Price = updatedBillParams.Price;
        }
        if (updatedBillParams.Title) {
          updatedBill.Title = updatedBillParams.Title;
        }
        if (updatedBillParams.ExpirationDate) {
          updatedBill.ExpirationDate = updatedBillParams.ExpirationDate;
        }
        if (updatedBillParams.IsPaid) {
          updatedBill.IsPaid = updatedBillParams.IsPaid;
        }
        bills.splice(index, 1, updatedBill);
      } else {
        throw new NotFoundException('Bill not found');
      }
    });
    return Promise.resolve(bills[billIndex]);
  }

  findBillById(id: string): Promise<Bill> {
    try {
      let billIndex: number;
      bills.map((bill, index) => {
        if (bill.Id === id) {
          billIndex = index;
        }
      });
      if (billIndex) {
        return Promise.resolve(bills[billIndex]);
      }
    } catch (err) {
      console.log(err);
      throw new NotFoundException('bill not found');
    }
  }
  delete(id: string): Promise<Bill> {
    try {
      let deletedBill: Bill;
      const newBillList = bills;
      newBillList.map((bill, index) => {
        if (bill.Id === id) {
          deletedBill = bill;
          bills.splice(index, 1);
        } else {
          throw new NotFoundException();
        }
      });
      return Promise.resolve(deletedBill);
    } catch (err) {
      console.log(err);
      throw new NotFoundException('bill not found');
    }
  }
}
