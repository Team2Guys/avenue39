import { Test, TestingModule } from '@nestjs/testing';
import { PaymobController } from './paymob.controller';
import { PaymobService } from './paymob.service';

describe('PaymobController', () => {
  let controller: PaymobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymobController],
      providers: [PaymobService],
    }).compile();

    controller = module.get<PaymobController>(PaymobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
