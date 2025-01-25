import { Test, TestingModule } from '@nestjs/testing';
import { PaytabsController } from './paytabs.controller';
import { PaytabsService } from './paytabs.service';

describe('PaytabsController', () => {
  let controller: PaytabsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaytabsController],
      providers: [PaytabsService],
    }).compile();

    controller = module.get<PaytabsController>(PaytabsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
