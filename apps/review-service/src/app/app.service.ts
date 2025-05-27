import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in ReviewService');
  }

  async healthCheck() {
    Logger.log('Health check called in ReviewService');
    return {
      statusCode: HttpStatus.OK,
      message: 'ReviewService is running',
      success: true,
      data: null,
    };
  }
}
