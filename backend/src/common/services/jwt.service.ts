import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  signMailTokenOptions,
  verifyMailTokenOptions,
} from '../config/jwt.config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async mailSignToken(email: string): Promise<string> {
    return await this.jwtService.signAsync(
      { email },
      signMailTokenOptions(this.configService),
    );
  }

  async mailVerifyToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(
      token,
      verifyMailTokenOptions(this.configService),
    );
  }
}
