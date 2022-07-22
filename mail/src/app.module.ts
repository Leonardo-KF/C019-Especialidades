import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SendmailService } from './services/sendmail.service';
import { MessagingModule } from './messaging/messaging.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [DatabaseModule, MessagingModule, MailModule],
  providers: [SendmailService],
})
export class AppModule {}
