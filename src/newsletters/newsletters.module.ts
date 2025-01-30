import { Module } from '@nestjs/common';
import { NewslettersService } from './newsletters.service';
import { NewslettersController } from './newsletters.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
@Module({
  controllers: [NewslettersController],
  providers: [NewslettersService],
  imports: [PrismaModule, ConfigModule],
})
export class NewslettersModule {}
