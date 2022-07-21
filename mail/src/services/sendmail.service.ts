import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Mail } from 'src/entities/mail.entity';

@Injectable()
export class SendmailService {
  constructor(private readonly prisma: PrismaService) {}
  createMail(mail: Mail) {
    return this.prisma.sentMails.create({ data: mail });
  }
}
