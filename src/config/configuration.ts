export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  database: {
    path: process.env.DATABASE_PATH || './db/dev.sql',
    logging: process.env.DATABASE_LOGGING === 'true',
    synchronize: process.env.DATABASE_SYNCHRONIZE !== 'false',
  },
});
