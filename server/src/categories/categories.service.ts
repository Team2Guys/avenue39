import { Delete, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { customHttpException } from '../utils/helper';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  getCategories() {
    try {
      return this.prisma.categories.findMany({
        include: {
          subcategories: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addCategory(categoryData: AddCategoryDto) {
    console.log('Update category triggered');
    console.log(categoryData);
    try {
      const { name } = categoryData;
      const existingCategory = await this.prisma.categories.findFirst({
        where: { name },
      });
      if (existingCategory) {
        return {
          message: 'Already exist!',
          status: HttpStatus.FORBIDDEN,
        };
      }
      await this.prisma.categories.create({
        data: {
          ...categoryData,
          posterImageUrl: categoryData.posterImageUrl.imageUrl ?? null,
          posterImagePublicId: categoryData.posterImageUrl.public_id ?? null,
        },
      });
      return {
        message: 'Category Created successfully🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
  async updateCategory(categoryData: UpdateCategoryDto) {
    console.log('Update category triggered');
    console.log(categoryData);
    try {
      const { id, name } = categoryData;

      // Find the existing category by id
      const existingCategory = await this.prisma.categories.findFirst({
        where: { id },
      });

      if (!existingCategory) {
        return {
          message: 'Category not found!',
          status: HttpStatus.NOT_FOUND,
        };
      }

      // Check if the name already exists and is not the current category
      const existingCategoryByName = await this.prisma.categories.findFirst({
        where: {
          name,
          id: { not: id },
        },
      });

      if (existingCategoryByName) {
        return {
          message: 'Category name already exists!',
          status: HttpStatus.CONFLICT,
        };
      }

      // Update category with new data or fallback to existing data
      await this.prisma.categories.update({
        where: { id },
        data: {
          name: name ?? existingCategory.name,
          description: categoryData.description ?? existingCategory.description,
          posterImageUrl:
            categoryData.posterImageUrl?.imageUrl ??
            existingCategory.posterImageUrl ??
            null,
          posterImagePublicId:
            categoryData.posterImageUrl?.public_id ??
            existingCategory.posterImagePublicId ??
            null,
        },
      });

      return {
        message: 'Category updated successfully 🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }

  async removeCategory(id: number) {
    try {
      const cateoryExist = await this.prisma.categories.findUnique({
        where: { id },
      });

      if (!cateoryExist) {
        return {
          message: 'Category does not exist ☹',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.categories.delete({
        where: { id },
      });

      return {
        message: 'Category removed successfully 😊',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
}
