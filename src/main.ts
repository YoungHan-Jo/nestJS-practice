import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from './env';

async function bootstrap() {
  const config = new ConfigService();
  EnvConfig.initialize(config);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
