import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { AddSubCategoryDto, UpdateSubCategoryDto } from './dto/subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get('/get-all')
  getSubCategories() {
    return this.subcategoriesService.getSubCategories();
  }

  @Post('add-subcategory')
  addSubCategory(@Body() addCategoryData: AddSubCategoryDto) {
    return this.subcategoriesService.addSubCategory(addCategoryData);
  }
  @Post('update-subcategory')
  updateSubCategory(@Body() addCategoryData: UpdateSubCategoryDto) {
    return this.subcategoriesService.updateSubCategory(addCategoryData);
  }

  @Delete('delete-subcategory')
  async removeSubCategory(@Headers('subcategoryId') categoryId: string) {
    const id = parseInt(categoryId, 10);

    if (isNaN(id)) {
      return { message: 'Invalid product ID', status: HttpStatus.BAD_REQUEST };
    }

    return this.subcategoriesService.removeSubCategory(id);
  }
}
