import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Bill } from 'src/entities/billEntity';
import { IBillRepository } from './IBillRepository';

@Injectable()
export class BillRepositoryPostgres implements IBillRepository {
  constructor(private readonly prisma: PrismaService) {}
  findBillsByExpirationIsToDay(): Promise<Bill[]> {
    try {
      const currentDay =
        new Date(Date.now()).toISOString().slice(0, 10) + 'T00:00:00Z';
      return this.prisma.bill.findMany({
        where: { ExpirationDate: currentDay },
      });
    } catch (err) {
      console.log(err);
    }
  }

  findBillsByUser(userId: string): Promise<Bill[]> {
    try {
      return this.prisma.bill.findMany({ where: { userId } });
    } catch (err) {
      console.log(err);
      throw new NotFoundException('user id not found');
    }
  }
  createBill(bill: Bill): Promise<Bill> {
    try {
      return this.prisma.bill.create({
        data: bill,
      });
    } catch (error) {
      console.log(error);
    }
  }
  findAllBills(): Promise<Bill[]> {
    try {
      return this.prisma.bill.findMany();
    } catch (error) {
      console.log(error);
    }
  }
  updateBill(
    id: string,
    bill: {
      Barcode?: string;
      Price?: number;
      Title?: string;
      ExpirationDate?: Date;
      IsPaid?: boolean;
    },
  ): Promise<Bill> {
    try {
      this.findBillById(id);
      return this.prisma.bill.update({
        where: {
          Id: id,
        },
        data: bill,
      });
    } catch (error) {
      console.log(error);
    }
  }
  findBillById(id: string): Promise<Bill> {
    try {
      return this.prisma.bill.findUnique({
        where: {
          Id: id,
        },
      });
    } catch (error) {
      throw new NotFoundException();
    }
  }
  delete(id: string): Promise<Bill> {
    try {
      return this.prisma.bill.delete({ where: { Id: id } });
    } catch (error) {
      console.log(error);
    }
  }
}
