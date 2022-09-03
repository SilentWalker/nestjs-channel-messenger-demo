import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message } from './entities/message.entity';
import { Channel } from '../channel/entities/channel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessagesArgs } from './dto/messages.args';
import { GraphqlMsgCode } from '../../common/enums/graphql.msg.code.enum';
import { CustomError } from '../../common/errors/custom.error';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,

    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  /**
   * 创建消息
   *
   * @param {CreateMessageInput} createMessageInput
   * @returns
   * @memberof MessageService
   */
  async create(createMessageInput: CreateMessageInput) {
    const { channelId } = createMessageInput;
    const _channel = await this.channelRepository.findOne({
      where: { id: channelId },
    });
    if (!_channel) {
      throw new CustomError(GraphqlMsgCode.CHANNEL_NOT_FOUND, '频道不存在');
    }
    const message = this.messageRepository.create(createMessageInput);
    message.channel = _channel;
    return this.messageRepository.save(message);
  }

  /**
   * 获取消息列表
   *
   * @param {MessagesArgs} messagesArgs
   * @returns
   * @memberof MessageService
   */
  findAll(messagesArgs: MessagesArgs) {
    const { channelId, skip, take, sortBy } = messagesArgs;

    // 生成排序条件
    const sortOption = {};
    if (typeof sortBy === 'string') {
      const sorts = sortBy.split(',');
      sorts.forEach((sort) => {
        const [key, value] = sort.split(':');
        sortOption[key] = value;
      });
    }

    // 生成查询条件
    const queryOption = {
      skip,
      take,
      order: sortOption,
      relations: ['channel'],
    };
    if (channelId) {
      const channel = new Channel();
      channel.id = channelId;
      queryOption['where'] = { channel };
    }

    return this.messageRepository.find(queryOption);
  }

  /**
   * 使用id获取消息信息
   *
   * @param {number} id
   * @returns
   * @memberof MessageService
   */
  async findOne(id: number) {
    const _message = await this.messageRepository.findOne({
      where: { id },
      relations: ['channel'],
    });
    if (!_message) {
      throw new CustomError(GraphqlMsgCode.MESSAGE_NOT_FOUND, '消息不存在');
    }
    return _message;
  }

  /**
   * 更新消息
   *
   * @param {number} id
   * @param {UpdateMessageInput} updateMessageInput
   * @returns
   * @memberof MessageService
   */
  async update(id: number, updateMessageInput: UpdateMessageInput) {
    const _message = await this.messageRepository.findOne({ where: { id } });
    if (!_message) {
      throw new CustomError(GraphqlMsgCode.MESSAGE_NOT_FOUND, '消息不存在');
    }
    const { channelId, title, content } = updateMessageInput;
    const updateObj = {
      title,
      content,
    };
    if (channelId) {
      const _channel = await this.channelRepository.findOne({
        where: { id: channelId },
      });
      if (!_channel) {
        throw new CustomError(GraphqlMsgCode.CHANNEL_NOT_FOUND, '频道不存在');
      }
      updateObj['channel'] = _channel;
    }
    await this.messageRepository.update(id, updateObj);

    return this.messageRepository.findOne({
      where: { id },
      relations: ['channel'],
    });
  }

  /**
   * 删除消息
   *
   * @param {number} id
   * @returns
   * @memberof MessageService
   */
  async remove(id: number) {
    const _message = await this.messageRepository.findOne({ where: { id } });
    if (!_message) {
      throw new CustomError(GraphqlMsgCode.MESSAGE_NOT_FOUND, '消息不存在');
    }
    await this.messageRepository.delete(id);
    return _message;
  }
}
