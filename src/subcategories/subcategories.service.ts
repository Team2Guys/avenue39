import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { AddSubCategoryDto, UpdateSubCategoryDto } from './dto/subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  getSubCategories() {
    try {
      return this.prisma.subCategories.findMany({
        include: {
          categories: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addSubCategory(categoryData: AddSubCategoryDto) {
    console.log('Add sub category triggered!');
    console.log(categoryData);
    try {
      const { name, posterImageUrl } = categoryData;
      const { description, categories, categoriesId, ...Data } = categoryData;

      const existingSubCategory = await this.prisma.subCategories.findFirst({
        where: { name },
      });

      if (existingSubCategory) {
        return {
          message: 'Subcategory already exists!',
          status: HttpStatus.FORBIDDEN,
        };
      }

      console.log('DATA');
      console.log(Data);
      if (!Array.isArray(categoriesId) || categoriesId.length === 0) {
        return {
          message: 'You must provide at least one category ID!',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      for (const categoryId of categoriesId) {
        const existingCategory = await this.prisma.categories.findUnique({
          where: { id: categoryId },
        });

        if (!existingCategory) {
          return {
            message: `Category with ID ${categoryId} does not exist!`,
            status: HttpStatus.BAD_REQUEST,
          };
        }
      }

      const newSubCategory = await this.prisma.subCategories.create({
        data: {
          ...Data,
          posterImageUrl: posterImageUrl.imageUrl,
          posterImagePublicId: posterImageUrl.public_id,
          categories: {
            connect: categoriesId.map((id) => ({ id })),
          },
        },
      });

      // Link the subcategory to the remaining categories, if any
      for (let i = 1; i < categoriesId.length; i++) {
        await this.prisma.subCategories.update({
          where: { id: newSubCategory.id },
          data: {
            categories: {
              connect: { id: categoriesId[i] },
            },
          },
        });
      }

      return {
        message: 'Subcategory created and linked successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateSubCategory(subCategoryData: UpdateSubCategoryDto) {
    console.log('Update subcategory triggered!');
    try {
      const { id, name, categoriesId, posterImageUrl, description, ...Data } =
        subCategoryData;

      const existingSubCategory = await this.prisma.subCategories.findUnique({
        where: { id },
      });

      if (!existingSubCategory) {
        return {
          message: 'Subcategory not found!',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const existingSubCategoryByName =
        await this.prisma.subCategories.findFirst({
          where: {
            name,
            id: { not: id },
          },
        });

      if (existingSubCategoryByName) {
        return {
          message: 'Subcategory name already exists!',
          status: HttpStatus.FORBIDDEN,
        };
      }

      if (!Array.isArray(categoriesId) || categoriesId.length === 0) {
        return {
          message: 'You must provide at least one category ID!',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      for (const categoryId of categoriesId) {
        const existingCategory = await this.prisma.categories.findUnique({
          where: { id: categoryId },
        });

        if (!existingCategory) {
          return {
            message: `Category with ID ${categoryId} does not exist!`,
            status: HttpStatus.BAD_REQUEST,
          };
        }
      }
      console.log('DATA');
      console.log(Data);

      await this.prisma.subCategories.update({
        where: { id },
        data: {
          ...Data,
          name,
          posterImageUrl: posterImageUrl.imageUrl,
          posterImagePublicId: posterImageUrl.public_id,
          categories: {
            set: categoriesId.map((categoryId) => ({ id: categoryId })),
          },
        },
      });

      return {
        message: 'Subcategory updated and linked successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeSubCategory(id: number) {
    try {
      const cateoryExist = await this.prisma.subCategories.findUnique({
        where: { id },
      });

      if (!cateoryExist) {
        return {
          message: 'Sub Category does not exist ☹',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.subCategories.delete({
        where: { id },
      });

      return {
        message: 'Sub Category removed successfully 😊',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
}
