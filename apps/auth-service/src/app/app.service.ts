import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in AuthService');
  }

  async healthCheck() {
    Logger.log('Health check called in AuthService');
    return {
      statusCode: HttpStatus.OK,
      message: 'AuthService is running',
      success: true,
      data: null,
    };
  }
}
