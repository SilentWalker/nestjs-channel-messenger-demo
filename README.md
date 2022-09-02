# nestjs-channel-messenger-demo

## 安装

```bash
$ npm install
```

### 配置文件

- 直接使用 npm 运行时，应用读取环境变量中的以下值
  - SERVER_PORT : 服务器端口，默认 `3000`
  - DATABASE_PATH : sqlite 数据库文件位置，默认 `./db/dev.sql`
  - DATABASE_LOGGING : 输出数据库日志，默认 `false`
  - DATABASE_SYNCHRONIZE : 同步表结构，默认 `true`
- 使用 `docker compose` 启动时，会使用以下文件中的值
  - `.env.dev` 开发环境，示例文件是 `.env.container.example`
  - `.env.prod` 生产环境，示例文件是 `.env.container.example`
  - `.env` 开发环境和生产环境暴露的端口，示例文件是 `.env.compose.example`

## 运行

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# docker compose
$ docker compose up
```

## 测试

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API 文档

### GraphQL PlayGround

默认情况下访问 http://127.0.0.1:3000/graphql

### Postman

导入 `postman-collection/nestjs-channel-messenger-demo.postman_collection.json` 文件
