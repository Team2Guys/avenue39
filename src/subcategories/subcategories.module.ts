import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
  imports: [PrismaModule, ConfigModule],
})
export class SubcategoriesModule {}
