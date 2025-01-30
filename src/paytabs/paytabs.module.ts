import { Module } from '@nestjs/common';
import { PaytabsService } from './paytabs.service';
import { PaytabsController } from './paytabs.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, PrismaModule, ConfigModule],
  controllers: [PaytabsController],
  providers: [PaytabsService],
})
export class PaytabsModule {}
