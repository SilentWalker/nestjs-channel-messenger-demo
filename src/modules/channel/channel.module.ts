import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ChannelResolver } from './channel.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Message } from '../message/entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel, Message])],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}
