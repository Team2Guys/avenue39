import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { AddSubCategoryDto, UpdateSubCategoryDto } from './dto/subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) { }

  @Get('/get-all')
  getSubCategories() {
    return this.subcategoriesService.getSubCategories();
  }
  
  @Get('getAllSubCategories')
  getAllSubCategories() {
    return this.subcategoriesService.getAllSubCategories();
  }
  @Get(':category/:subcategory')
  getSingleSubCategories(
    @Param('category') category: string,
    @Param('subcategory') subcategory: string,
  ) {
    return this.subcategoriesService.getSingeSubCategory(category,subcategory);
  }

  @Post('add-subcategory')
  addSubCategory(@Body() addCategoryData: AddSubCategoryDto, @Req() req: Request) {
    const user = req['user'];
    return this.subcategoriesService.addSubCategory(addCategoryData, user.email);
  }

  @Post('update-subcategory')
  updateSubCategory(@Body() addCategoryData: UpdateSubCategoryDto, @Req() req: Request) {
    const user = req['user'];
    return this.subcategoriesService.updateSubCategory(addCategoryData, user.email);
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
