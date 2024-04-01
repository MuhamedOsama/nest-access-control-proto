import { Injectable } from '@nestjs/common/decorators/core';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(private configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: this.configService.getOrThrow<string>('FIREBASE_PROJECT_ID'),
        clientEmail: this.configService.getOrThrow<string>(
          'FIREBASE_CLIENT_EMAIL',
        ),
        privateKey: this.configService
          .getOrThrow<string>('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
      }),
    });
  }

  getAuth() {
    return admin.auth();
  }

  // Add other methods to interact with Firebase as needed
}
