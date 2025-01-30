import { Test, TestingModule } from '@nestjs/testing';
import { SalesRecordController } from './sales_record.controller';
import { SalesRecordService } from './sales_record.service';

describe('SalesRecordController', () => {
  let controller: SalesRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesRecordController],
      providers: [SalesRecordService],
    }).compile();

    controller = module.get<SalesRecordController>(SalesRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
