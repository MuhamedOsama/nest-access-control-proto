// auth.guard.ts
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) return false;

    const token = request.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      return false;
    }
  }
}
