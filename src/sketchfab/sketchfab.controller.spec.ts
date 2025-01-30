import { Test, TestingModule } from '@nestjs/testing';
import { SketchfabController } from './sketchfab.controller';
import { SketchfabService } from './sketchfab.service';

describe('SketchfabController', () => {
  let controller: SketchfabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SketchfabController],
      providers: [SketchfabService],
    }).compile();

    controller = module.get<SketchfabController>(SketchfabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
