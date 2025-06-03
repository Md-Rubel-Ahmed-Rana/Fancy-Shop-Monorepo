import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { cookieManager } from '../utils/cookies';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCurrentUser(@Req() req) {
    return this.authService.getCurrentUser(req?.user?.id);
  }

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
