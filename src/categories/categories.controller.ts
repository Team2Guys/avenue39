import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AddCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/get-all')
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Post('add-category')
  addCategory(@Body() addCategoryData: AddCategoryDto) {
    return this.categoriesService.addCategory(addCategoryData);
  }

  @Post('update-category')
  updateCategory(@Body() addCategoryData: UpdateCategoryDto) {
    return this.categoriesService.updateCategory(addCategoryData);
  }

  @Delete('delete-category')
  async removeCategory(@Query('categoryId') categoryId: string) {
    const id = parseInt(categoryId, 10);

    if (isNaN(id)) {
      return { message: 'Invalid product ID', status: HttpStatus.BAD_REQUEST };
    }

    return this.categoriesService.removeCategory(id);
  }
}
