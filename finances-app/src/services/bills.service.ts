import { Injectable } from '@nestjs/common';
import { Bill } from 'src/entities/billEntity';
import { BillRepositoryInMemory } from 'src/repositories/BillRepositoryInMemory';
import { BillRepositoryPostgres } from 'src/repositories/BillRepositoryPostgres';

@Injectable()
export class BillsService {
  constructor(private readonly billsRepository: BillRepositoryPostgres) {}
  async createBill(data: Bill) {
    return await this.billsRepository.createBill(data);
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
}
