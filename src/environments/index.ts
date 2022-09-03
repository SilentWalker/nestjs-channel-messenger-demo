import * as dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const PORT = process.env.SERVER_PORT || 3000;

const DATABASE_PATH = process.env.DATABASE_PATH || './db/dev.sql';
const DATABASE_LOGGING = process.env.DATABASE_LOGGING === 'true';
const DATABASE_SYNCHRONIZE = process.env.DATABASE_SYNCHRONIZE !== 'false';

const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#87e8de';

const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 10;

export {
  NODE_ENV,
  PORT,
  DATABASE_PATH,
  DATABASE_LOGGING,
  DATABASE_SYNCHRONIZE,
  GRAPHQL_DEPTH_LIMIT,
  PRIMARY_COLOR,
};
