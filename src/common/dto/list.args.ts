import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class ListArgs {
  @Field(() => Int, {
    defaultValue: 0,
    nullable: true,
    description: '分页跳过的记录数',
  })
  @Min(0)
  skip?: number = 0;

  @Field(() => Int, {
    defaultValue: 25,
    nullable: true,
    description: '分页大小，默认为25，最大为50',
  })
  @Min(1)
  @Max(50)
  take?: number = 25;

  @Field(() => String, {
    nullable: true,
    description:
      '排序字段，格式为：字段名:排序方式，排序方式为：ASC、DESC，多个排序字段用逗号分隔',
  })
  sortBy?: string;
}
