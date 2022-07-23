import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Receiver } from 'src/entities/receiver.entity';

@Injectable()
export class ReceiversService {
  constructor(private readonly prisma: PrismaService) {}

  async createReceiver(receiver: Receiver) {
    return await this.prisma.receiver.create({ data: receiver });
  }

  async updateReceiver(id: string, receiver: Receiver) {
    return await this.prisma.receiver.update({ where: { id }, data: receiver });
  }

  async findReceiverByAuth0Id(Auth0Id: string) {
    return await this.prisma.receiver.findUnique({
      where: { auth0Id: Auth0Id },
    });
  }
}
