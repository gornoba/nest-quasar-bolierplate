import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import {
  node,
  firebase,
  db,
  bull,
  crypto,
  email,
  host,
  sheet,
  jwt,
} from './common/config/env.config';
import { BullModule } from '@nestjs/bull';
import { bullOptions } from './common/config/bull.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './common/config/typeorm.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [node, firebase, db, bull, crypto, email, host, sheet, jwt],
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    BullModule.forRootAsync(bullOptions),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../front'),
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
