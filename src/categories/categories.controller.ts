import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AddCategoryDto, UpdateCategoryDto, UpdateCategoryHomeProductsDto } from './dto/category.dto';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/get-all')
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get('getHeaderCategories')
  getHeaderCategories() {
    return this.categoriesService.getHeaderCategories();
  }

  @Get('getAllCategories')
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post('add-category')
  addCategory(@Body() addCategoryData: AddCategoryDto,@Req() req:Request) {
    const user=req['user'];
    return this.categoriesService.addCategory(addCategoryData,user.email);
  }

  @Post('update-category')
  updateCategory(@Body() addCategoryData: UpdateCategoryDto,@Req() req:Request) {
    const user=req['user'];
    return this.categoriesService.updateCategory(addCategoryData,user.email);
  }

  @Post('update-category-home-products')
  updateCategoryHomeProduct(@Body() addCategoryData: UpdateCategoryHomeProductsDto,@Req() req:Request) {
    const user=req['user'];
    return this.categoriesService.updateCategoryHomeProduct(addCategoryData ,user.email);
  }

  @Delete('delete-category')
  async removeCategory(@Query('categoryId') categoryId: string) {
    const id = parseInt(categoryId, 10);

    if (isNaN(id)) {
      return { message: 'Invalid product ID', status: HttpStatus.BAD_REQUEST };
    }

    return this.categoriesService.removeCategory(id);
  }

  @Get(':category')
  async getSingleCategory(@Param('category') category: string) {
    return this.categoriesService.getSingleCategory(category);
  }


}


