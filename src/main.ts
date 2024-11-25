import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose'],
  });
  const logger = new Logger('main.ts');

  const app_port = process.env.APP_PORT || 6200;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      //forbidNonWhitelisted: true,
    }),
  );

  logger.verbose(`===========================================`);
  logger.verbose(`APP STARTED`);
  logger.verbose(`APP PORT: ${app_port}`);
  logger.verbose(`APP LOCAL: http://localhost:6200/graphql`);
  logger.verbose(`===========================================`);

  await app.listen(app_port);
}

bootstrap();
