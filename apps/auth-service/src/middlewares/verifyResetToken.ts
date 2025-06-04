import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class VerifyResetPasswordToken implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  use(req: Request, res: Response) {
    const resetToken = req.query.token as string;

    if (!resetToken) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Reset token is required.',
      });
    }

    try {
      this.jwtService.verify(resetToken, {
        secret: this.config.get<string>('JWT_SECRET'),
      }) as {
        id: string;
        email: string;
      };

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Reset token verified.',
      });
    } catch (err: any) {
      const message =
        err.name === 'TokenExpiredError'
          ? 'The reset link has expired. Please request a new one.'
          : 'Invalid reset token. Please request a new one.';

      return res.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        success: false,
        message,
      });
    }
  }
}
