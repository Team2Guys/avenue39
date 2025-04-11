import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { customHttpException } from '../utils/helper';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CHACHE_CATEGORY_KEY } from '../../src/utils/CacheKeys';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }



  async getCategories() {
    try {
      const cachedCategories = await this.cacheManager.get(CHACHE_CATEGORY_KEY);
      if (cachedCategories) {
        console.log('Returning categories from cache')
        return cachedCategories;
      }

      let categories = await this.prisma.categories.findMany({
        // include: {
        //   subcategories: { include: { categories: true, products: true } },
        //   products: {
        //     include: {
        //       subcategories: true,
        //       categories: true,
        //     },
        //   }
        // },
        select:{
          id:true,
          name:true,
          description:true,
          posterImageUrl:true,
          subcategories:{
            select:{
              name:true,
              custom_url:true,
              products:{
                select:{
                  name:true,
                  custom_url:true
                }
              }
            }
          },
          products:{
            select:{
              name:true,
              posterImageUrl:true,
              custom_url:true,
              stock:true,
              price:true,
              hoverImageUrl:true,
              categories:{
                select:{
                  custom_url:true,
                  name:true
                }
              },
              subcategories:{
                select:{
                  custom_url:true,
                  name:true
                }
              }
            }
          }
        }

      });

      // @ts-ignore
      await this.cacheManager.set(CHACHE_CATEGORY_KEY, categories, { ttl: 3600 }); // Set expiration to 1 hour

      return categories;


    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addCategory(categoryData: AddCategoryDto, userEmail: string) {
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
          last_editedBy: userEmail,
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

  async updateCategory(categoryData: UpdateCategoryDto, userEmail: string) {
    console.log('Update category triggered');
    console.log(userEmail);
    try {
      const { id, name } = categoryData;

      const existingCategory = await this.prisma.categories.findFirst({
        where: { id },
      });

      if (!existingCategory) {
        return {
          message: 'Category not found!',
          status: HttpStatus.NOT_FOUND,
        };
      }

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

      await this.prisma.categories.update({
        where: { id },
        data: {
          ...categoryData,
          posterImageUrl: categoryData.posterImageUrl.imageUrl ?? null,
          posterImagePublicId: categoryData.posterImageUrl.public_id ?? null,
          last_editedBy: userEmail,
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


  async getSingleCategory(categoryName:string) {
    try {
      console.log(categoryName, "category name")
      const cachedCategories = await this.cacheManager.get("signleCategory");
      if (cachedCategories) {
        console.log('Returning categories from cache')
        return cachedCategories;
      }

      let categories = await this.prisma.categories.findFirst({
        where: {
          OR: [
            { custom_url: categoryName },
            { name: categoryName }
          ]
        },
        select: {
          meta_title: true,
          meta_description: true,
          posterImageUrl: true,
          canonical_tag:true,
          images_alt_text:true
    
        }
    
      });

      // @ts-ignore
      await this.cacheManager.set(CHACHE_CATEGORY_KEY, signleCategory, { ttl: 3600 }); // Set expiration to 1 hour

      return categories;


    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
