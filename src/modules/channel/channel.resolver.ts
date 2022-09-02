import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChannelService } from './channel.service';
import { Channel } from './entities/channel.entity';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { ListArgs } from '../../common/dto/list.args';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(() => Channel)
  createChannel(
    @Args('createChannelInput') createChannelInput: CreateChannelInput,
  ) {
    return this.channelService.create(createChannelInput);
  }

  @Query(() => [Channel], { name: 'channels' })
  findAll(@Args() listArgs: ListArgs) {
    return this.channelService.findAll(listArgs);
  }

  @Query(() => Channel, { name: 'channel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.findOne(id);
  }

  @Mutation(() => Channel)
  updateChannel(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateChannelInput') updateChannelInput: UpdateChannelInput,
  ) {
    return this.channelService.update(id, updateChannelInput);
  }

  @Mutation(() => Channel)
  removeChannel(@Args('id', { type: () => Int }) id: number) {
    return this.channelService.remove(id);
  }
}
