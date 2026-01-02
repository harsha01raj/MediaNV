import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { MynameController } from './myname/myname.controller';

@Module({
  imports: [CustomerModule],
  controllers: [AppController, MynameController],
  providers: [AppService],
})
export class AppModule {}
