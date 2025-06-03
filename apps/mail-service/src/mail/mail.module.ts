import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.GMAIL_HOST as string,
        port: Number(process.env.GMAIL_PORT) as number,
        secure: true,
        auth: {
          user: process.env.GOOGLE_USER as string,
          pass: process.env.GOOGLE_APP_PASSWORD as string,
        },
      },
      defaults: {
        from: '"Fancy Shop" <no-reply@mdrubelahmedrana521@gmail.com.com>',
      },
      template: {
        dir: path.join(process.cwd(), 'apps/mail-service/src/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService, ConfigService, Logger],
  exports: [MailService, ConfigService],
})
export class MailModule {}
