import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT, NODE_ENV } from './environments';
import { LoggerMiddleware, LoggingInterceptor, ValidationPipe } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  NODE_ENV !== 'production' && app.use(LoggerMiddleware);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  const url = await app.getUrl();
  console.log(`Server running on ${url}, GraphQL on ${url}/graphql`);
}
bootstrap();
