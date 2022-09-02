import { ListArgs } from '../../../common/dto/list.args';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class MessagesArgs extends ListArgs {
  @Field(() => Int, { nullable: true, description: 'channel id' })
  channelId: number;
}
