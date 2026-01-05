import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

@Module({
  imports: [CustomerModule],
  controllers: [AppController, MynameController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
