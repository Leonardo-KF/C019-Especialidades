import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SendmailService } from './services/sendmail.service';
@Module({
  imports: [DatabaseModule],
  providers: [SendmailService],
})
export class AppModule {}
