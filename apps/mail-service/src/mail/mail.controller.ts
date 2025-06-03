import { Controller, Logger } from '@nestjs/common';
import { MailService } from './mail.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly logger: Logger
  ) {}

  @MessagePattern('send_forgot_password_mail')
  async handleForgotPassword(
    @Payload() data: { name: string; email: string; resetLink: string }
  ) {
    const { name, email, resetLink } = data;

    this.logger.log(
      `📨 Received 'send_forgot_password_mail' event for user: ${email}, preparing to send email.`
    );

    return this.mailService.sendForgotPasswordEmail(email, name, resetLink);
  }
}
