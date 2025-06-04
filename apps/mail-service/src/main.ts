import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 9011;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE || 'mail_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  app.listen(port, () => {
    Logger.log(`🚀 Mail Application is running on: http://localhost:${port}`);
  });
}

bootstrap().catch((error) => {
  Logger.error('❌ Failed to start mail application', error);
});
