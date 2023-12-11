import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class FirebaseGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  canActivate(context: any): boolean {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const query = req.query;

    if (!query.uid) {
      throw new UnauthorizedException('유저정보가 없습니다.');
    }

    // this.firebaseService.seesion(query.uid);
    // 위의 함수로 세션 점검

    return true;
  }
}
