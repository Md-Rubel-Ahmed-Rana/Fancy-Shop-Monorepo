import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  authenticate() {
    console.log({
      from: 'AuthService',
      message: 'Authentication successful',
      timestamp: new Date().toISOString(),
      status: 'success',
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'Authentication successful',
      success: true,
      data: null,
    };
  }
}
