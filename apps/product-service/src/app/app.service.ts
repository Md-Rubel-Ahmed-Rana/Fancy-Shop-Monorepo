import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in ProductService');
  }

  async healthCheck() {
    Logger.log('Health check called in ProductService');
    return {
      statusCode: HttpStatus.OK,
      message: 'ProductService is running',
      success: true,
      data: null,
    };
  }
}
