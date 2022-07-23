import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class Auht0Service {
  private AUTH0_DOMAIN: string;
  private AUTH0_AUDIENCE: string;
  private CLIENT_ID: string;
  private CLIENT_SECRET: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.AUTH0_DOMAIN = this.configService.get('AUHT0_DOMAIN');
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE');
    this.CLIENT_ID = this.configService.get('AUTHO_CLIENID');
    this.CLIENT_SECRET = this.configService.get('AUTH0_CLIENT_SECRET');
  }

  async getToken() {
    const accessData = await lastValueFrom(
      this.httpService.post(this.AUTH0_DOMAIN + '/oauth/token', {
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        audience: this.AUTH0_AUDIENCE,
        grant_type: 'client_credentials',
      }),
    );

    return accessData.data.access_token;
  }

  async getReceiverInfoByAuth0UserId(auth0UserId: string, token: string) {
    const user = await lastValueFrom(
      this.httpService.get(this.AUTH0_AUDIENCE + 'users/' + auth0UserId, {
        headers: { Authorization: 'Bearer ' + token },
      }),
    );

    const receiver = {
      auth0Id: auth0UserId,
      name: user.data.name,
      email: user.data.email,
    };

    return receiver;
  }
}
