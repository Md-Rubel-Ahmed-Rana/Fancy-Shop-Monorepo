import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in MailService');
  }

  async healthCheck() {
    Logger.log('Health check called in MailService');
    return {
      statusCode: HttpStatus.OK,
      message: 'MailService is running',
      success: true,
      data: null,
    };
  }
}
