import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/get-all')
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post('add-product')
  addProduct(@Body() addProductData: AddProductDto) {
    return this.productsService.addProduct(addProductData);
  }
  @Post('update-product')
  updateProduct(@Body() addProductData: UpdateProductDto) {
    return this.productsService.updateProduct(addProductData);
  }

  @Delete('delete-product')
  async removeProduct(@Headers('productId') productId: string) {
    const id = parseInt(productId, 10);

    if (isNaN(id)) {
      return { message: 'Invalid product ID', status: HttpStatus.BAD_REQUEST };
    }

    return this.productsService.removeProduct(id);
  }
}
