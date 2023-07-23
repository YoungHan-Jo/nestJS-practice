import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersController } from './users/users.controller';
import { ServiceB } from './service-B';
import { ServiceA } from './service-A';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, UsersController],
  providers: [ServiceB, ServiceA, UsersService, EmailService],
})
export class AppModule {}
