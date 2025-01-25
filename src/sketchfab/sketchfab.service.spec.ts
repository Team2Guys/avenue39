import { Test, TestingModule } from '@nestjs/testing';
import { SketchfabService } from './sketchfab.service';

describe('SketchfabService', () => {
  let service: SketchfabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SketchfabService],
    }).compile();

    service = module.get<SketchfabService>(SketchfabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
