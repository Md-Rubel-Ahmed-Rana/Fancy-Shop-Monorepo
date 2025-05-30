import {
  Inject,
  Injectable,
  HttpException,
  HttpStatus,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BcryptInstance } from '../lib/bcrypt';
import { lastValueFrom, Observable } from 'rxjs';

interface UserServiceClient {
  GetUserByEmail(data: {
    email: string;
  }): Observable<{ id: string; email: string; password: string }>;
}

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject('USER_SERVICE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async login(email: string, password: string) {
    let user;

    try {
      user = await lastValueFrom(this.userService.GetUserByEmail({ email }));
    } catch (error) {
      console.log({
        from: 'Auth service login method to get user by grpc',
        error,
      });
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const isMatch = await BcryptInstance.compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    // generate tokens

    return {
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      success: true,
      data: null,
    };
  }
}
