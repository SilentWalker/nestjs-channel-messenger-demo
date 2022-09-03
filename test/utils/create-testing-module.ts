import { Test } from '@nestjs/testing'
import { AppModule } from '../../src/app.module'

export async function createTestingModule() {
  const moduleBuilder = Test.createTestingModule({
    imports: [AppModule],
  })
  const compiled = await moduleBuilder.compile()

  const app = compiled.createNestApplication()
  return await app.init()
}