import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PORT || 9010;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE || 'auth_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.use(morgan('dev'));
  app.use(cookieParser());

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`🚀 Auth Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  Logger.error('❌ Failed to start auth application', err);
});
