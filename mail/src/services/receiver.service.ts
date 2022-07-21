import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Receiver } from 'src/entities/receiver.entity';

@Injectable()
export class ReceiversService {
  constructor(private readonly prisma: PrismaService) {}

  createReceiver(receiver: Receiver) {
    return this.prisma.receiver.create({ data: receiver });
  }

  updateReceiver(id: string, receiver: Receiver) {
    return this.prisma.receiver.update({ where: { id }, data: receiver });
  }

  async getToken() {}
}
