import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MessagingModule } from './messaging/messaging.module';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [DatabaseModule, MessagingModule, MailModule],
})
export class AppModule {}
