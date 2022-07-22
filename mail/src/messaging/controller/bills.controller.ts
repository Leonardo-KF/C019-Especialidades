import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

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
  @EventPattern('financesApp.billsExpired')
  async sendMail(@Payload('value') payload: BillsExpiredPaylod) {
    console.log(payload);
  }
}
