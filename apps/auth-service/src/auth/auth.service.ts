import {
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { BcryptInstance } from '../lib/bcrypt';
import { lastValueFrom } from 'rxjs';
import { JWT } from '../lib/jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserServiceClient } from './interfaces';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;
  private jwt: JWT;

  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
    @Inject('MAIL_SERVICE') private rmqClient: ClientProxy,
    private jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly logger: Logger
  ) {
    this.jwt = new JWT(config, jwtService);
  }

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    let user;

    try {
      user = await lastValueFrom(this.userService.GetUserByEmail({ email }));
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await BcryptInstance.compare(password, user.password);
    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    // generate tokens
    const accessToken = await this.jwt.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await this.jwt.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    // fire an event to user microservice to update last login time

    return { accessToken, refreshToken };
  }

  async generatePasswordResetLink(email: string) {
    let user;

    try {
      user = await lastValueFrom(this.userService.GetUserByEmail({ email }));
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // generate tokens
    const token = await this.jwt.generatePasswordResetToken(
      user.id,
      user.email
    );

    const url = `${this.config.get<string>(
      'FRONTEND_DOMAIN'
    )}/reset-password?token=${encodeURIComponent(token)}`;

    // call mail microservice
    this.rmqClient.emit('send_forgot_password_mail', {
      name: user.name,
      email: user.email,
      resetLink: url,
    });

    this.logger.log(
      `📧 Forgot password email event emitted to MAIL_SERVICE for user: ${user.email}`
    );

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message:
        'Password reset link has been sent to your email. Please check and reset your password.',
      data: null,
    };
  }

  async getCurrentUser(id: string) {
    const user = await lastValueFrom(this.userService.GetUserById({ id }));

    if (!user) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        success: false,
        message: 'User was not found',
        data: null,
      };
    }

    return {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Current logged in user retrieved successfully!',
      data: user,
    };
  }
}
