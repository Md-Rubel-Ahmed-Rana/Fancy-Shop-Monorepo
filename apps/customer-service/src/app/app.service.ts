import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in CustomerService');
  }

  async healthCheck() {
    Logger.log('Health check called in CustomerService');
    return {
      statusCode: HttpStatus.OK,
      message: 'CustomerService is running',
      success: true,
      data: null,
    };
  }
}
