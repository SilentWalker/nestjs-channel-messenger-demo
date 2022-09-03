import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Channel } from '../channel/entities/channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Channel])],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}
