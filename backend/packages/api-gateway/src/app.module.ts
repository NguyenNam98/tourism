import {
  DynamicModule,
  Global,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import {ProxyMiddlewareAPI} from "./middlewares/proxyGuard";
import {XssProtectionMiddleware} from "./middlewares/xssProtection";
@Global()
@Module({})
export class AppModule {
  static forRoot(modules: any[]): DynamicModule {
    return {
      module: AppModule,
      imports: [...modules],
    };
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XssProtectionMiddleware).forRoutes('/*');
    consumer.apply(ProxyMiddlewareAPI).forRoutes('*');
  }
}
