import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in PaymentService');
  }

  async healthCheck() {
    Logger.log('Health check called in PaymentService');
    return {
      statusCode: HttpStatus.OK,
      message: 'PaymentService is running',
      success: true,
      data: null,
    };
  }
}
