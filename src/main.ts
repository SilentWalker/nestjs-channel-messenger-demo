import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
  const url = await app.getUrl();
  console.log(`Server running on ${url}, GraphQL on ${url}/graphql`);
}
bootstrap();
