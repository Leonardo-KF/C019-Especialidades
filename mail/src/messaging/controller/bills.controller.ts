import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailService } from 'src/mail/mail.service';
import { Auht0Service } from 'src/services/auth0.service';
import { ReceiversService } from 'src/services/receiver.service';
import { SendMailService } from 'src/services/sendmail.service';

interface User {
  auth0UserId: string;
}

interface Bill {
  title: string;
  price: number;
  barcode: string;
}

interface BillsExpiredPaylod {
  user: User;
  bill: Bill;
}

@Controller()
export class BillsController {
  constructor(
    private readonly auth0: Auht0Service,
    private readonly receiverService: ReceiversService,
    private readonly mail: MailService,
    private readonly saveMail: SendMailService,
  ) {}

  @EventPattern('financesApp.billsExpired')
  async sendMail(@Payload('value') payload: BillsExpiredPaylod) {
    console.log('rodou');
    const token = await this.auth0.getToken();
    console.log(token);
    const receiver = await this.auth0.getReceiverInfoByAuth0UserId(
      payload.user.auth0UserId,
      token,
    );
    let receiverInDatabase = await this.receiverService.findReceiverByAuth0Id(
      receiver.auth0Id,
    );

    if (!receiverInDatabase) {
      receiverInDatabase = await this.receiverService.createReceiver(receiver);
    }

    await this.mail.sendMail(
      {
        name: receiverInDatabase.name,
        email: receiverInDatabase.email,
      },
      {
        codebar: payload.bill.barcode,
        price: payload.bill.price,
        title: payload.bill.title,
      },
    );
    const body = `Hey ${receiverInDatabase.name}
                  Your bill for ${payload.bill.title} has expired. 
                  Price: ${payload.bill.price}
                  CodeBar: ${payload.bill.barcode} 
                  Please pay it now.`;

    this.saveMail.createMail({
      title: payload.bill.title,
      receiverId: receiverInDatabase.id,
      body: body,
    });
  }
}
