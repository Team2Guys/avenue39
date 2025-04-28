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
  Req,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductDto, PaginatedPrducts, UpdateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/get-all')
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get('/getHeaderProducts')
  async getHeaderProducts() {
    return await this.productsService.getHeaderProducts();
  }

  @Get('get-all-products')
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  @Post('get-paginated-products')
  async getPaginatedProducts(@Body() addProductData: PaginatedPrducts,) {
    console.log('function Called', addProductData)
    return this.productsService.getPaginatedProducts(addProductData.categoryname, addProductData.page, addProductData.pageSize);
  }

  @Get(':product')
  async getSingleCategory(@Param('product') product: string) {
    return this.productsService.getSingeProduct(product);
  }




  @Post('add-product')
  addProduct(@Body() addProductData: AddProductDto, @Req() req:Request) {
    const user=req['user'];
    return this.productsService.addProduct(addProductData,user.email);
  }
  @Post('update-product')
  updateProduct(@Body() addProductData: UpdateProductDto, @Req() req:Request) {
    const user=req['user'];
    return this.productsService.updateProduct(addProductData, user.email);
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
