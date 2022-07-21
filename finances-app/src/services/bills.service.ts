import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Bill } from 'src/entities/billEntity';
import { BillRepositoryInMemory } from 'src/repositories/BillRepositoryInMemory';
import { BillRepositoryPostgres } from 'src/repositories/BillRepositoryPostgres';

@Injectable()
export class BillsService {
  constructor(private readonly billsRepository: BillRepositoryPostgres) {}
  async createBill(data: Bill) {
    const newExpirationDate: Date = new Date(
      data.ExpirationDate.toISOString().slice(0, 10) + 'T00:00:00Z',
    );
    return await this.billsRepository.createBill({
      ...data,
      ExpirationDate: newExpirationDate,
    });
  }

  async findBills() {
    return await this.billsRepository.findAllBills();
  }

  async updateBill(billId: string, data: Bill) {
    return await this.billsRepository.updateBill(billId, data);
  }

  async findById(id: string) {
    return await this.billsRepository.findBillById(id);
  }

  async deletedBill(id: string) {
    return await this.billsRepository.delete(id);
  }

  async findBillByUser(userId: string) {
    return await this.billsRepository.findBillsByUser(userId);
  }

  // @Cron('10 * * * * *')
  async findBillsByExpiration() {
    const bills = await this.billsRepository.findBillsByExpirationIsToDay();
    console.log(bills);
  }
}
