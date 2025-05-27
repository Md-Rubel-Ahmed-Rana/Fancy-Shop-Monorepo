import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    Logger.log('🐇 RabbitMQ listener initialized in InventoryService');
  }

  async healthCheck() {
    Logger.log('Health check called in InventoryService');
    return {
      statusCode: HttpStatus.OK,
      message: 'InventoryService is running',
      success: true,
      data: null,
    };
  }
}
