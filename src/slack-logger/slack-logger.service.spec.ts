import { Test, TestingModule } from '@nestjs/testing';
import { SlackLogger } from './slack-logger.service';

describe('SLoggerService', () => {
  let service: SlackLogger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SlackLogger],
    }).compile();

    service = module.get<SlackLogger>(SlackLogger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
