import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import morgan from 'morgan';

async function bootstrap() {
  const port = process.env.PORT || 9001;
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.RMQ_QUEUE || 'user',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.use(morgan('dev'));

  app.listen(port, () => {
    Logger.log(`🚀 User Application is running on: http://localhost:${port}`);
  });
}

bootstrap();
