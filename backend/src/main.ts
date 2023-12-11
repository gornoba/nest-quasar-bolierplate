import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as expressBasicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { SuccessInterceptor } from './common/interceptors/success.intercepter';
import { RecordRepository } from './common/repositorys/record.repository';
import { AllExceptionFilter } from './common/exceptions/all-exception.filter';

dotenv.config();

class Application {
  private looger = new Logger(Application.name);
  private DEV_MODE: boolean;
  private PORT: string;
  private corsOriginList: string[];
  private SWAGGER_USER: string;
  private SWAGGER_PASSWORD: string;
  private cspOptions1: string[];
  private cspOptions2: string[];
  private secret: string;

  constructor(private server: NestExpressApplication) {
    this.server = server;

    if (!process.env.SESSION_SECRET) this.looger.error('Set "SECRET" env');
    this.DEV_MODE = process.env.NODE_ENV === 'production' ? false : true;
    this.PORT = process.env.PORT || '8080';
    this.corsOriginList = process.env.CORS_ORIGIN_LIST
      ? process.env.CORS_ORIGIN_LIST.split(/,/g).map((origin) => origin.trim())
      : ['*'];
    this.SWAGGER_USER = process.env.SWAGGER_USER || 'admin';
    this.SWAGGER_PASSWORD = process.env.SWAGGER_PASSWORD || '12345';
    this.cspOptions1 = process.env.CSPOPTIONS1
      ? process.env.CSPOPTIONS1.split(/,/g).map((origin) => origin.trim())
      : [];
    this.cspOptions2 = process.env.CSPOPTIONS2
      ? process.env.CSPOPTIONS1.split(/,/g).map((origin) => origin.trim())
      : [];
    this.secret = process.env.SESSION_SECRET;
  }

  private setUpSwaggerAuth() {
    this.server.use(
      ['/docs', '/docs-json'],
      expressBasicAuth({
        challenge: true,
        users: { [this.SWAGGER_USER]: this.SWAGGER_PASSWORD },
      }),
    );
  }

  private setUpSwagger() {
    SwaggerModule.setup(
      'docs',
      this.server,
      SwaggerModule.createDocument(
        this.server,
        new DocumentBuilder()
          .setTitle('Nest Quasar Boilerplate APIs')
          .setDescription('')
          .setVersion('1.0')
          .addCookieAuth('access_token', {
            type: 'apiKey',
            in: 'cookie',
          })
          .build(),
        { ignoreGlobalPrefix: false },
      ),
    );
  }

  private async setUpGlobalMiddleware() {
    this.server.enableCors({
      origin: this.corsOriginList,
      credentials: true,
    });

    const cspOptions = {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'default-src': this.cspOptions1,
        'script-src': this.cspOptions1,
        'img-src': this.cspOptions1,
        'connect-src': this.cspOptions2,
      },
    };
    this.server.use(
      helmet({
        contentSecurityPolicy: cspOptions,
        crossOriginEmbedderPolicy: false,
      }),
    );

    this.server.use(
      session({
        secret: this.secret,
        resave: false,
        saveUninitialized: false,
      }),
    );

    this.server.use(cookieParser());
    this.server.use(json({ limit: '100mb' }));
    this.server.use(urlencoded({ limit: '100mb', extended: true }));
    this.server.setGlobalPrefix('api');
    this.setUpSwaggerAuth();
    this.setUpSwagger();
  }

  private async setUpNestGlobalMiddleware() {
    this.server.useGlobalPipes(
      new ValidationPipe({
        transform: true, // 이 옵션을 true로 설정하면 DTO에 정의된 속성 값이 자동으로 변환됩니다. 예를 들어, @IsInt()로 정수 형식의 값만 입력받도록 지정된 속성에 "123"이라는 문자열이 들어온 경우 자동으로 123으로 변환됩니다. 기본값은 false이며, transform이 true일 경우 변환 중 오류가 발생하면 ValidationException이 발생합니다.
        skipNullProperties: false, // true로 설정하면 입력 데이터 객체에 null인 속성이 있으면 검증에서 제외됩니다. 기본값은 false입니다.
        skipMissingProperties: false, // 이 옵션을 true로 설정하면 DTO에 정의된 속성 중 하나라도 누락된 경우 유효성 검사를 건너뜁니다. 기본값은 false이며, 누락된 속성은 유효하지 않은 값으로 처리됩니다.
        skipUndefinedProperties: false, // 이 옵션을 true로 설정하면 DTO에 정의된 속성 중 undefined인 경우 유효성 검사를 건너뜁니다. 기본값은 false이며, undefined인 속성은 유효하지 않은 값으로 처리됩니다.
        forbidUnknownValues: false, // 이 옵션을 true로 설정하면 DTO에 정의되지 않은 속성이 들어온 경우 유효성 검사를 실패시킵니다. 기본값은 false이며, 이 경우 정의되지 않은 속성은 무시됩니다.
        whitelist: false, // 이 옵션을 true로 설정하면 DTO에 정의된 속성만 허용합니다. 즉, DTO에 정의되지 않은 속성이 들어온 경우 유효성 검사를 실패시킵니다. 기본값은 false이며, 이 경우 정의되지 않은 속성은 무시됩니다.
        forbidNonWhitelisted: false, //  true로 설정하면 whitelist 옵션이 true일 때 입력 데이터 객체에 존재하지 않는 속성이 있으면 검증 실패를 유발합니다. 기본값은 false입니다.
      }),
    );
    this.server.useGlobalInterceptors(new SuccessInterceptor());
    this.server.useGlobalFilters(
      new AllExceptionFilter(this.server.get(RecordRepository)),
    );
  }

  async bootstrap() {
    await this.setUpGlobalMiddleware();
    await this.setUpNestGlobalMiddleware();
    await this.server.listen(this.PORT);
  }

  startLog() {
    if (this.DEV_MODE) {
      this.looger.log(`server on http://localhost:${this.PORT}`);
    } else {
      this.looger.log(`server on port ${this.PORT}`);
    }
  }

  errorLog(error: string) {
    this.looger.error(`server error ${error}`);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule);
  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init().catch((error) => {
  new Logger('init').error(error);
});
