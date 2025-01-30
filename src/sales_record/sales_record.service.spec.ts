import { Test, TestingModule } from '@nestjs/testing';
import { SalesRecordService } from './sales_record.service';

describe('SalesRecordService', () => {
  let service: SalesRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesRecordService],
    }).compile();

    service = module.get<SalesRecordService>(SalesRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
