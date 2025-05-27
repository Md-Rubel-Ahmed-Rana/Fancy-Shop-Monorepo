import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in OrderService');
  }

  async healthCheck() {
    Logger.log('Health check called in OrderService');
    return {
      statusCode: HttpStatus.OK,
      message: 'OrderService is running',
      success: true,
      data: null,
    };
  }
}
