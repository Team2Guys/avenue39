import { Module } from '@nestjs/common';
import { SalesRecordService } from './sales_record.service';
import { SalesRecordController } from './sales_record.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SalesRecordController],
  providers: [SalesRecordService],
  imports: [PrismaModule, ConfigModule],

})
export class SalesRecordModule {}
