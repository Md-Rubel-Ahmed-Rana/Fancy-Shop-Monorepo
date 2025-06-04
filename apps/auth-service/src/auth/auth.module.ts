import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { VerifyResetPasswordToken } from '../middlewares/verifyResetToken';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: process.env.USER_GRPC_URL || 'localhost:50051',
          package: 'user',
          protoPath: join(process.cwd(), 'proto/user.proto'),
        },
      },
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://localhost:5672'],
          queue: process.env.MAIL_RMQ_QUEUE || 'mail_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyResetPasswordToken).forRoutes({
      path: 'auth/verify-reset-password-token',
      method: RequestMethod.GET,
    });
  }
}
