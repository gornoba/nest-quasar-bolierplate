import { Module } from '@nestjs/common';
import admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from './services/firebase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordRogEntity } from './entities/record.entity';
import { RecordRepository } from './repositorys/record.repository';
import { EmailService } from './services/email.service';
import { TokenService } from './services/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecordRogEntity]),
    JwtModule.register({}),
  ],
  providers: [
    {
      provide: 'FirebaseAdmin',
      useFactory: (configService: ConfigService) => {
        admin.initializeApp({
          projectId: configService.get('firebase.id'),
          credential: admin.credential.cert({
            projectId: configService.get('firebase.id'),
            clientEmail: configService.get('firebase.email'),
            privateKey: configService.get('firebase.key'),
          }),
        });
        return admin;
      },
      inject: [ConfigService],
    },

    FirebaseService,
    RecordRepository,
    EmailService,
    TokenService,
  ],
  exports: [RecordRepository, EmailService, TokenService],
})
export class CommonModule {}
