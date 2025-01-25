import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [PrismaModule, ConfigModule],
})
export class ReviewsModule {}
