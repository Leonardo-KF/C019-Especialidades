import { Module } from '@nestjs/common';
import { BillsController } from './controller/bills.controller';

@Module({
  controllers: [BillsController],
})
export class MessagingModule {}
