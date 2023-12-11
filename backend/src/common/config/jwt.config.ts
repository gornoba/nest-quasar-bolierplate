import { ConfigService } from '@nestjs/config';
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export const signMailTokenOptions = (
  configService: ConfigService,
): JwtSignOptions => ({
  secret: configService.get('jwt.access_key'),
  algorithm: configService.get('jwt.sign_algorithm'),
  expiresIn: '1h',
  issuer: configService.get('jwt.issuer'),
  audience: configService.get('jwt.audience'),
});

export const verifyMailTokenOptions = (
  configService: ConfigService,
): JwtVerifyOptions => ({
  secret: configService.get('jwt.access_key'),
  algorithms: configService.get('jwt.verify_algorithm'),
  issuer: configService.get('jwt.issuer'),
  audience: configService.get('jwt.audience'),
  clockTolerance: 30,
  ignoreExpiration: false,
});
