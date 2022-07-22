import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

type ReceiverParams = {
  name: string;
  email: string;
};

type BillParams = {
  title: string;
  price: number;
  codebar: string;
};

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: ReceiverParams, bill: BillParams) {}
}
