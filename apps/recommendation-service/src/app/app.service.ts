import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in RecommendationService');
  }

  async healthCheck() {
    Logger.log('Health check called in RecommendationService');
    return {
      statusCode: HttpStatus.OK,
      message: 'RecommendationService is running',
      success: true,
      data: null,
    };
  }
}
