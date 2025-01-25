import { Module } from '@nestjs/common';
import { SketchfabService } from './sketchfab.service';
import { SketchfabController } from './sketchfab.controller';

@Module({
  controllers: [SketchfabController],
  providers: [SketchfabService],
})
export class SketchfabModule {}
