import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { XssProtectionMiddleware } from './middlewares/xssProtection'
import {DatabaseModule} from "./database.module";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
@Global()
@Module({})
export class AppModule {
  static forRoot(modules): DynamicModule {
    return {
      module: AppModule,
      imports: [
        DatabaseModule.forRoot(),
        HttpModule,
        ...modules,
        ThrottlerModule.forRoot({
          limit: 10000,
          ttl: 100000000,
          ignoreUserAgents: [/(Chrome-Lighthouse|bot)/i],
        }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: ThrottlerGuard,
        },
      ],
      exports: [
      ],
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XssProtectionMiddleware).forRoutes('/api/*')
  }
}
