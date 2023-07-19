import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './env';
import { Firestore } from './infrastructure/firestore/client/firestore';

async function bootstrap() {
  const config = new ConfigService();
  EnvConfig.initialize(config);
  Firestore.initialize();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
