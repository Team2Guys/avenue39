import { Module } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { PaymobController } from './paymob.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule, ConfigModule],
  controllers: [PaymobController],
  providers: [PaymobService],
})
export class PaymobModule {}
