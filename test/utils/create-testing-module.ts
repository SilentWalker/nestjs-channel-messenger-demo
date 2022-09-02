import { Test } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'

// 使用内存数据库作为测试数据库
process.env.DATABASE_PATH = ':memory:'

export async function createTestingModule() {
  const moduleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
  const compiled = await moduleBuilder.compile()

  const app = compiled.createNestApplication()
  return await app.init()
}