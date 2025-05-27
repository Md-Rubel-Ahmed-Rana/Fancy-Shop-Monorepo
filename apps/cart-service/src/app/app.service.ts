import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in CartService');
  }

  async healthCheck() {
    Logger.log('Health check called in CartService');
    return {
      statusCode: HttpStatus.OK,
      message: 'CartService is running',
      success: true,
      data: null,
    };
  }
}
