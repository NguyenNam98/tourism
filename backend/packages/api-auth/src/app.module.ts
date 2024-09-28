import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { RATE_LIMIT_DEFAULT } from 'app.constant'
import { XssProtectionMiddleware } from './middlewares/xssProtection'
import {JWTTokenService} from "./services/JWTToken.service";
import {DatabaseModule} from "./database.module";
import {CryptoService} from "./services/crypto.service";
@Global()
@Module({

})
export class AppModule {
  static forRoot(modules): DynamicModule {
    return {
      module: AppModule,
      imports: [
        DatabaseModule.forRoot(),
        HttpModule,
        ...modules,
        ThrottlerModule.forRoot({
          limit: RATE_LIMIT_DEFAULT.LIMIT,
          ttl: RATE_LIMIT_DEFAULT.TTL,
          ignoreUserAgents: [/(Chrome-Lighthouse|bot)/i],
        }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        },
        JWTTokenService,
        CryptoService
      ],
      exports: [
        JWTTokenService,
        CryptoService
      ],
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XssProtectionMiddleware).forRoutes('/api/*')
  }
}
