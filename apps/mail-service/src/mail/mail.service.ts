import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  logoUrl: string;
  backgroundImageUrl: string;
  facebookUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  facebookIcon: string;
  githubIcon: string;
  linkedinIcon: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
    private readonly logger: Logger
  ) {
    this.logoUrl = this.config.get<string>('LOGO_URL');
    this.backgroundImageUrl = this.config.get<string>('BACKGROUND_IMAGE_URL');
    this.facebookUrl = this.config.get<string>('FACEBOOK_URL');
    this.githubUrl = this.config.get<string>('GITHUB_URL');
    this.linkedinUrl = this.config.get<string>('LINKEDIN_URL');
    this.facebookIcon = this.config.get<string>('FACEBOOK_ICON');
    this.githubIcon = this.config.get<string>('GITHUB_ICON');
    this.linkedinIcon = this.config.get<string>('LINKEDIN_ICON');
  }

  async sendForgotPasswordEmail(to: string, name: string, resetLink: string) {
    try {
      const info = await this.mailerService.sendMail({
        to,
        subject: 'Reset Your Password',
        template: 'forgot-password',
        context: {
          name,
          resetLink,
          logoUrl: this.logoUrl,
          backgroundImageUrl: this.backgroundImageUrl,
          facebookUrl: this.facebookUrl,
          githubUrl: this.githubUrl,
          linkedinUrl: this.linkedinUrl,
          facebookIcon: this.facebookIcon,
          githubIcon: this.githubIcon,
          linkedinIcon: this.linkedinIcon,
          year: new Date().getFullYear(),
          companyName: 'Fancy Shop',
        },
      });

      this.logger.log({ mailInfo: info });

      this.logger.log(
        `Password reset email sent successfully to ${to}`,
        MailService.name
      );
    } catch (error) {
      this.logger.error(
        `Failed to send password reset email to ${to}: ${error.message}`,
        error.stack,
        MailService.name
      );
    }
  }
}
