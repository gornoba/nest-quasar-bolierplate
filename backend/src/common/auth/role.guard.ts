import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as _ from 'lodash';
import { ROLES_KEY } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length === 0 || !requiredRoles) {
      return true;
    }

    // firebase의 uid를 통해서 repository에서 권한검증 필요

    const userAuth = [];

    if (!userAuth.some((a: any) => requiredRoles.includes(a))) {
      throw new UnauthorizedException('접근 권한이 없습니다.');
    }

    return true;
  }
}
