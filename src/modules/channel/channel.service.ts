import { Injectable } from '@nestjs/common';
import { Channel } from './entities/channel.entity';
import { Message } from '../message/entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelInput } from './dto/create-channel.input';
import { UpdateChannelInput } from './dto/update-channel.input';
import { ListArgs } from '../../common/dto/list.args';
import { GraphqlMsgCode } from '../../common/enums/graphql.msg.code.enum';
import { CustomError } from '../../common/errors/custom.error';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  /**
   * 创建频道
   *
   * @param {CreateChannelInput} createChannelInput
   * @returns
   * @memberof ChannelService
   */
  create(createChannelInput: CreateChannelInput) {
    const channel = this.channelRepository.create(createChannelInput);
    return this.channelRepository.save(channel);
  }

  /**
   * 使用id获取频道信息
   *
   * @param {number} id
   * @returns
   * @memberof ChannelService
   */
  async findOne(id: number) {
    const _channel = await this.channelRepository.findOne({ where: { id } });
    if (!_channel) {
      throw new CustomError(GraphqlMsgCode.CHANNEL_NOT_FOUND, '频道不存在');
    }
    return _channel;
  }

  /**
   * 获取频道列表
   *
   * @param {ListArgs} listArgs
   * @returns
   * @memberof ChannelService
   */
  async findAll(listArgs: ListArgs) {
    const { skip, take, sortBy } = listArgs;

    // 生成排序条件
    const sortOption = {};
    if (typeof sortBy === 'string') {
      const sorts = sortBy.split(',');
      sorts.forEach((sort) => {
        const [key, value] = sort.split(':');
        sortOption[key] = value;
      });
    } else {
      sortOption['id'] = 'DESC';
    }

    // 获取频道列表
    return this.channelRepository.find({
      skip,
      take,
      order: sortOption,
    });
  }

  /**
   * 更新频道信息
   *
   * @param {number} id
   * @param {UpdateChannelInput} updateChannelInput
   * @memberof ChannelService
   */
  async update(id: number, updateChannelInput: UpdateChannelInput) {
    const _channel = await this.channelRepository.findOne({ where: { id } });
    if (!_channel) {
      throw new CustomError(GraphqlMsgCode.CHANNEL_NOT_FOUND, '频道不存在');
    }
    await this.channelRepository.update({ id }, updateChannelInput);

    return this.channelRepository.findOne({ where: { id } });
  }

  /**
   * 删除频道
   *
   * @param {number} id
   * @returns
   * @memberof ChannelService
   */
  async remove(id: number) {
    const _channel = await this.channelRepository.findOne({ where: { id } });
    if (!_channel) {
      throw new CustomError(GraphqlMsgCode.CHANNEL_NOT_FOUND, '频道不存在');
    }
    await this.messageRepository.delete({ channel: _channel });
    await this.channelRepository.delete({ id });

    return _channel;
  }
}
