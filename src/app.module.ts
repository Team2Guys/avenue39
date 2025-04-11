import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminModule } from './admin/admin.module';
import { SalesRecordModule } from './sales_record/sales_record.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { PaymobModule } from './paymob/paymob.module';
import { PaytabsModule } from './paytabs/paytabs.module';
import { NewslettersModule } from './newsletters/newsletters.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { LoggerMiddleware } from '../src/common/logger.middleware';
import { FileUploadModule } from './file-upload/file-upload.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';



@Module({
  imports: [

    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'src', 'newsletters', 'templates'),
      serveRoot: '/templates',

    }),

    UsersModule,
    PrismaModule,
    ProductsModule,
    CategoriesModule,
    ReviewsModule,
    AdminModule,
    SalesRecordModule,
    SubcategoriesModule,
    PaymobModule,
    PaytabsModule,
    NewslettersModule,
    FileUploadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware).exclude(
        { path: "sales-record/trackorder/:id", method: RequestMethod.GET },
        { path: "sales-record/add_sales", method: RequestMethod.POST },
        { path: "sales-record/update-payment-status", method: RequestMethod.PATCH },
        { path: "category/get-all", method: RequestMethod.GET },
        { path: 'category/:category', method: RequestMethod.GET },
        { path: "subcategories/get-all", method: RequestMethod.GET },
        { path: "product/get-all", method: RequestMethod.GET },
        { path: "product/:product", method: RequestMethod.GET },
        {path: 'subcategories/:category/:subcategory',method: RequestMethod.GET,
        }

      )
      .forRoutes('sales-record', 'category', 'subcategories', 'product');
  }
}