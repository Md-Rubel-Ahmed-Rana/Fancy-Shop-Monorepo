import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 9002;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE || 'customer',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.listen(port, () => {
    Logger.log(
      `🚀 Customer Application is running on: http://localhost:${port}`
    );
  });
}

bootstrap();
