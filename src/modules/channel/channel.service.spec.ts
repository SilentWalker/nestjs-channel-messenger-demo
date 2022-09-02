import { Test, TestingModule } from '@nestjs/testing';
import { ChannelService } from './channel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Channel } from './entities/channel.entity';
import { Message } from '../message/entities/message.entity';
import { Repository } from 'typeorm';
import {
  repositoryMockFactory,
  MockType,
} from '../../common/utils/repository.mock';

describe('ChannelService', () => {
  let service: ChannelService;
  let channelRepositoryMock: MockType<Repository<Channel>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelService,
        {
          provide: getRepositoryToken(Channel),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Message),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<ChannelService>(ChannelService);
    channelRepositoryMock = module.get(getRepositoryToken(Channel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create channel', async () => {
    const channel = new Channel();
    channel.name = 'Test';
    const result = await service.create(channel);
    expect(result).toEqual(channel);
  });

  it('should find all channels', async () => {
    const channels = [new Channel(), new Channel()];
    channelRepositoryMock.find.mockReturnValue(channels);
    const result = await service.findAll({});
    expect(result).toEqual(channels);
  });

  it('should find one channel', async () => {
    const channel = new Channel();
    channelRepositoryMock.findOne.mockReturnValue(channel);
    const result = await service.findOne(1);
    expect(result).toEqual(channel);
  });

  it('should update channel', async () => {
    const channel = new Channel();
    channelRepositoryMock.findOne.mockReturnValue(channel);
    const result = await service.update(1, channel);
    expect(result).toEqual(channel);
  });

  it('should remove channel', async () => {
    const channel = new Channel();
    channelRepositoryMock.findOne.mockReturnValue(channel);
    const result = await service.remove(1);
    expect(result).toEqual(channel);
  });
});
