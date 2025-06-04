import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
}
