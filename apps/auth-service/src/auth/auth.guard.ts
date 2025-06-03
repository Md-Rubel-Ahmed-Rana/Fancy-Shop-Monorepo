import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JWT } from '../lib/jwt';
import { cookieManager } from '../utils/cookies';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtUtil: JWT;

  constructor(
    private jwtService: JwtService,
    private readonly config: ConfigService
  ) {
    this.jwtUtil = new JWT(config, jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const accessToken = this.extractAccessTokenFromCookie(request);
    const refreshToken = this.extractRefreshTokenFromCookie(request);

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException('Authentication required.');
    }

    try {
      const payload = await this.jwtService.verify(accessToken, {
        secret: this.config.get<string>('JWT_SECRET'),
      });

      request['user'] = payload;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError && refreshToken) {
        try {
          const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.config.get<string>('JWT_SECRET'),
          });

          const newAccessToken = await this.jwtUtil.generateAccessToken({
            id: payload.id,
            email: payload.email,
          });

          const newRefreshToken = await this.jwtUtil.generateRefreshToken({
            id: payload.id,
            email: payload.email,
          });

          cookieManager.setTokens(response, newAccessToken, newRefreshToken);

          request['user'] = payload;
          return true;
        } catch {
          cookieManager.clearTokens(response);
          throw new UnauthorizedException(
            'Session expired. Please log in again.'
          );
        }
      }
      console.log({ error });
      // cookieManager.clearTokens(response);
      throw new UnauthorizedException('Invalid token.');
    }
  }

  private extractAccessTokenFromCookie(request: Request): string | undefined {
    console.log({ AccessToken: request.cookies?.fancyShopAccessToken });
    return request.cookies?.fancyShopAccessToken.split(' ')[1];
  }

  private extractRefreshTokenFromCookie(request: Request): string | undefined {
    console.log({ RefreshToken: request.cookies?.fancyShopRefreshToken });
    return request.cookies?.fancyShopRefreshToken.split(' ')[1];
  }
}
