import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 9003;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: Number(port),
      },
    }
  );

  await app.listen();
  Logger.log(`🚀 Product Application is running on: http://localhost:${port}`);
}

bootstrap();
