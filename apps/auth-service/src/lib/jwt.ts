import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';

export class JWT {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  private signToken = async (
    payload: { id: string; email: string },
    secret: string,
    expiresIn: number | string
  ): Promise<string> => {
    return this.jwtService.sign(payload, { expiresIn, secret });
  };

  public generateAccessToken = async (payload: {
    id: string;
    email: string;
  }): Promise<string> => {
    return this.signToken(
      payload,
      this.config.get<string>('JWT_SECRET'),
      this.config.get<string>('JWT_ACCESS_TOKEN_EXPIRE')
    );
  };

  public generateRefreshToken = async (payload: {
    id: string;
    email: string;
  }): Promise<string> => {
    return this.signToken(
      payload,
      this.config.get<string>('JWT_SECRET'),
      this.config.get<string>('JWT_REFRESH_TOKEN_EXPIRE')
    );
  };

  public async generatePasswordResetToken(
    id: string,
    email: string
  ): Promise<string> {
    const token = await this.signToken(
      { id, email },
      this.config.get<string>('JWT_SECRET'),
      '10m'
    );

    return token;
  }

  public verifyResetPasswordToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const resetToken = req.query.token as string;

    if (!resetToken) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        success: false,
        message: 'Reset token is required.',
      });
    }

    try {
      const decoded = this.jwtService.verify(resetToken, {
        secret: this.config.get<string>('JWT_SECRET'),
      }) as {
        id: string;
        email: string;
      };

      req['user'] = decoded;
      next();
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
  };
}
