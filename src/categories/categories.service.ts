import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCategoryDto, UpdateCategoryDto, UpdateCategoryHomeProductsDto } from './dto/category.dto';
import { customHttpException } from '../utils/helper';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CHACHE_CATEGORY_HEADER_KEY, CHACHE_CATEGORY_KEY, CHACHE_CATEGORY_PRODUCTS_KEY } from '../../src/utils/CacheKeys';

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
        select: {
          id: true,
          name: true,
          description: true,
          short_description: true,
          posterImageUrl: true,
          subcategories: {
            select: {
              name: true,
              custom_url: true,
              products: {
                select: {
                  name: true,
                  custom_url: true
                }
              }
            }
          },
          products: {
            select: {
              name: true,
              posterImageUrl: true,
              custom_url: true,
              stock: true,
              price: true,
              hoverImageUrl: true,
              categories: {
                select: {
                  custom_url: true,
                  name: true
                }
              },
              subcategories: {
                select: {
                  custom_url: true,
                  name: true
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

  async getAllCategories() {
    try {
      let categories = await this.prisma.categories.findMany({
        include: {
          subcategories: { include: { categories: true, products: true } },
          products: {
            include: {
              subcategories: true,
              categories: true,
            },
          }
        },


      });

      return categories;


    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getHeaderCategories() {
    try {
      const cachedCategories = await this.cacheManager.get(CHACHE_CATEGORY_HEADER_KEY);
      console.log(cachedCategories, "cachec categories")
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
        select: {
          id: true,
          name: true,
          subcategories: {
            select: {
              name: true,
              custom_url: true,
            }
          },
        }


      });

      // @ts-ignore
      await this.cacheManager.set(CHACHE_CATEGORY_HEADER_KEY, categories, { ttl: 3600 }); // Set expiration to 1 hour

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


  async getSingleCategory(categoryName: string) {
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
          canonical_tag: true,
          images_alt_text: true

        }

      });

      // @ts-ignore
      await this.cacheManager.set(CHACHE_CATEGORY_KEY, signleCategory, { ttl: 3600 }); // Set expiration to 1 hour

      return categories;


    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async updateCategoryHomeProduct(categoryData: UpdateCategoryHomeProductsDto, userEmail: string) {
    console.log('Update product category triggered');
    console.log('User Email:', userEmail);

    try {
      const { home_product } = categoryData;

      for (const categoryName in home_product) {
        if (Object.prototype.hasOwnProperty.call(home_product, categoryName)) {
          const existingCategory = await this.prisma.categories.findFirst({
            where: { name: categoryName.toUpperCase() },
          });

          if (!existingCategory) {
            return {
              message: `Category "${categoryName}" not found!`,
              status: HttpStatus.NOT_FOUND,
            };
          }

          const productIdArrays = home_product[categoryName];
          const allProductIds = productIdArrays.flat();

          const products = await this.prisma.products.findMany({
            where: { id: { in: allProductIds } },
            select: {
              id: true,
              name: true,
              posterImageUrl: true,
              hoverImageUrl: true,
              description: true,
              custom_url: true,
              stock: true,
              price: true,
              discountPrice: true,
              HomeProductImage: true,
              sizes: true,
              filter: true,
              productImages: true,
              categories: {
                select: {
                  custom_url: true,
                  name: true
                }
              },
              subcategories: {
                select: {
                  custom_url: true,
                  name: true
                }
              }
            }
          });


          const updatedHomeProduct = productIdArrays.map(productIds => {
            return productIds.map(id => products.find(product => product.id === id));
          });

          await this.cacheManager.del(CHACHE_CATEGORY_PRODUCTS_KEY);
          await this.prisma.categories.update({
            where: { id: existingCategory.id },
            data: {
              home_product: updatedHomeProduct,
            },
          });
        }
      }

      return {
        message: 'Categories updated successfully 🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error updating categories:', error.message);
      return {
        message: 'Something went wrong!',
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }



  async getHomeProductCategories() {
    try {
      const cachedCategories = await this.cacheManager.get(CHACHE_CATEGORY_PRODUCTS_KEY);
      console.log(cachedCategories, "cachec categories")
      if (cachedCategories) {
        console.log('Returning categories from cache')
        return cachedCategories;
      }

      let categories = await this.prisma.categories.findMany({
        select: {
          id: true,
          name: true,
          home_product: true,
          short_description: true
        }
      });

      // @ts-ignore
      await this.cacheManager.set(CHACHE_CATEGORY_PRODUCTS_KEY, categories, { ttl: 3600 }); // Set expiration to 1 hour

      return categories;


    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

}
