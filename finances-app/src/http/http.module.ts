import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthtestController } from '../authtest/authtest.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthtestController],
})
export class HttpModule {}
