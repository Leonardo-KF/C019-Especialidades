import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../http/auth/authorization.guard';

@Controller('authtest')
export class AuthtestController {
  @Get()
  @UseGuards(AuthorizationGuard)
  getHello(): string {
    return 'Hello World!';
  }
}
