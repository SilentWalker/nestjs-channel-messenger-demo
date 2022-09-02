import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import {
  repositoryMockFactory,
  MockType,
} from '../../common/utils/repository.mock';

describe('MessageService', () => {
  let service: MessageService;
  let repositoryMock: MockType<Repository<Message>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    repositoryMock = module.get(getRepositoryToken(Message));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create message', async () => {
    const message = new Message();
    message.content = 'Test';

    repositoryMock.save.mockReturnValue(message);
    const result = await service.create({
      channelId: 1,
      content: 'Test',
      title: 'Test',
    });
    expect(result).toEqual(message);
  });

  it('should find all messages', async () => {
    const messages = [new Message(), new Message()];
    repositoryMock.find.mockReturnValue(messages);
    const result = await service.findAll({ channelId: 1 });
    expect(result).toEqual(messages);
  });

  it('should find one message', async () => {
    const message = new Message();
    repositoryMock.findOne.mockReturnValue(message);
    const result = await service.findOne(1);
    expect(result).toEqual(message);
  });

  it('should update message', async () => {
    const message = new Message();
    repositoryMock.findOne.mockReturnValue(message);
    const result = await service.update(1, message);
    expect(result).toEqual(message);
  });

  it('should remove message', async () => {
    const message = new Message();
    repositoryMock.findOne.mockReturnValue(message);
    const result = await service.remove(1);
    expect(result).toEqual(message);
  });
});
