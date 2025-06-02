import {
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BcryptInstance } from '../lib/bcrypt';
import { lastValueFrom, Observable } from 'rxjs';
import { JWT } from '../lib/jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface UserServiceClient {
  GetUserByEmail(data: {
    email: string;
  }): Observable<{ id: string; email: string; password: string }>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;
  private jwt: JWT;

  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientGrpc,
    private jwtService: JwtService,
    private readonly config: ConfigService
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
    Logger.log('User is being logged in');
    let user;

    try {
      user = await lastValueFrom(this.userService.GetUserByEmail({ email }));
      console.log('Getting user from user microservice');
    } catch (error) {
      Logger.log({
        from: 'Auth service login method to get user by grpc',
        error,
      });
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    console.log('Matching user password');

    const isMatch = await BcryptInstance.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    console.log('Password matched');

    // generate tokens
    console.log('Generating tokens');
    const accessToken = await this.jwt.generateAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await this.jwt.generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    return { accessToken, refreshToken };
  }
}
