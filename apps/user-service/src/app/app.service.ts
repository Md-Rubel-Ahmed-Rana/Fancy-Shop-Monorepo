import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in UserService');
  }

  async healthCheck() {
    Logger.log('Health check called in UserService');
    return {
      statusCode: HttpStatus.OK,
      message: 'UserService is running',
      success: true,
      data: null,
    };
  }
}
