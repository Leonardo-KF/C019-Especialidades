import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Bill } from 'src/entities/billEntity';
import { KafkaService } from 'src/messaging/kafka.service';
import { BillRepositoryInMemory } from 'src/repositories/BillRepositoryInMemory';
import { BillRepositoryPostgres } from 'src/repositories/BillRepositoryPostgres';
import { UserRepository } from 'src/repositories/UserRepositoryPostgres';

@Injectable()
export class BillsService {
  constructor(
    private readonly billsRepository: BillRepositoryPostgres,
    private kafkaService: KafkaService,
    private readonly userRepository: UserRepository,
  ) {}
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
    const newExpirationDate: Date = new Date(
      data.ExpirationDate.toISOString().slice(0, 10) + 'T00:00:00Z',
    );
    return await this.billsRepository.updateBill(billId, {
      ...data,
      ExpirationDate: newExpirationDate,
    });
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

  @Cron('10 * * * * *')
  async findBillsByExpiration() {
    const bills = await this.billsRepository.findBillsByExpirationIsToDay();
    console.log(bills);
    bills.map(async (bill) => {
      const user = await this.userRepository.findUserById(bill.userId);

      this.kafkaService.emit('financesApp.billsExpired', {
        user: {
          auth0UserId: user.Auth0Id,
        },
        bill: {
          title: bill.Title,
          price: bill.Price,
          barcode: bill.Barcode,
        },
      });
    });
  }
}
