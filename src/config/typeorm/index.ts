import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DATABASE_PATH,
  DATABASE_LOGGING,
  DATABASE_SYNCHRONIZE,
} from '../../environments';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: DATABASE_PATH,
      logging: DATABASE_LOGGING,
      synchronize: DATABASE_SYNCHRONIZE,
      autoLoadEntities: true,
    };
  }
}
