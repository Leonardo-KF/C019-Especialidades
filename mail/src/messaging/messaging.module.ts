import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { MailModule } from 'src/mail/mail.module';
import { Auht0Service } from 'src/services/auth0.service';
import { ReceiversService } from 'src/services/receiver.service';
import { SendMailService } from 'src/services/sendmail.service';
import { BillsController } from './controller/bills.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), MailModule, DatabaseModule],
  controllers: [BillsController],
  providers: [Auht0Service, ReceiversService, SendMailService],
})
export class MessagingModule {}
