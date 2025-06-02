import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { cookieManager } from '../utils/cookies';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res) {
    console.log('I am from auth controller');
    const { accessToken, refreshToken } = await this.authService.login(
      body.email,
      body.password
    );
    cookieManager.setTokens(
      res,
      `Bearer ${accessToken}`,
      `Bearer ${refreshToken}`
    );
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User logged in successfully',
      success: true,
      data: null,
    });
  }
}
