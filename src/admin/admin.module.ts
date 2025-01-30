import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [PrismaModule, ConfigModule],
})
export class AdminModule {}
