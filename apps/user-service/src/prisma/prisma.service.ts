import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }
  async onModuleInit() {
    Logger.log('Database connecting...');
    try {
      await this.$connect();
      Logger.log('Database connected successfully!');
    } catch (error: any) {
      console.log(error);
      Logger.error(`Failed to connect to database. Error: ${error?.message}`);
    }
  }
}
