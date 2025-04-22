import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException, generateSlug } from '../utils/helper';
import { AddSubCategoryDto, UpdateSubCategoryDto } from './dto/subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) { }

  async getSubCategories() {
    try {
      return await this.prisma.subCategories.findMany({
        // include: {
        //   categories: { include:{subcategories: true,products: true}},
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
          custom_url: true,
          description: true,
          products: {
            select: {
              name: true,
              custom_url: true,
              price: true,
              discountPrice: true,
              posterImageUrl: true,
              hoverImageUrl: true,
              filter:true,
              sizes:true,
              stock:true,
              productImages:true,
              categories:{
                select:{
                  name:true,
                  custom_url:true,
                  id:true,
                }
              },
              subcategories:{
                select:{
                  name:true,
                  custom_url:true,
                  id:true
                }
              }
            }
          },
          categories: {
            select: {
              name: true,
              custom_url: true,
              subcategories: {

                select: {
                  custom_url: true,
                  name: true,
                }
              },

              products: {
                select: {
                  name: true,
                  custom_url: true,
                  price: true,
                  discountPrice: true,
                  posterImageUrl: true,
                  hoverImageUrl: true,
                  subcategories: {
                    select: {
                      custom_url: true,
                      name: true,
                    }
                  },
                }
              }
            }
          }
        }
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }


  async getAllSubCategories() {
    try {
      return await this.prisma.subCategories.findMany({
        include: {
          categories: { include:{subcategories: true,products: true}},
          products: {
            include: {
              subcategories: true, 
              categories: true,
            },
          }
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addSubCategory(categoryData: AddSubCategoryDto, userEmail: string) {

    try {
      const { name, posterImageUrl } = categoryData;
      const { categories, categoriesId, ...Data } = categoryData;

      const existingSubCategory = await this.prisma.subCategories.findFirst({
        where: { name },
      });

      if (existingSubCategory) {
        return {
          message: 'Subcategory already exists!',
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

      const newSubCategory = await this.prisma.subCategories.create({
        data: {
          ...Data,
          posterImageUrl: posterImageUrl.imageUrl,
          posterImagePublicId: posterImageUrl.public_id,
          categories: {
            connect: categoriesId.map((id) => ({ id })),
          },
          last_editedBy: userEmail,

        },
      });

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

  async updateSubCategory(subCategoryData: UpdateSubCategoryDto, userEmail: string) {
    try {
      const { id, name, categoriesId, posterImageUrl, ...Data } =
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
          last_editedBy: userEmail,
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


  async getSingeSubCategory(category: string, subcategoryName: string) {
    try {
      const subCategories = await this.prisma.subCategories.findMany({
        select: {
          meta_title: true,
          meta_description: true,
          posterImageUrl: true,
          canonical_tag: true,
          images_alt_text: true,
          name: true,
          custom_url: true,
          categories: {
            select: {
              name: true,
              custom_url: true,
            },
          },
        },
      })

      const matchedProduct: any = subCategories?.find((item: any) => {
        const isNameMatch = generateSlug(item.custom_url || item.name) === subcategoryName;
        const belongsToCategory = item.categories.some((value: any) =>
          generateSlug(value.custom_url || value.name).trim().toLocaleLowerCase() === category,
        );
        return isNameMatch && belongsToCategory;
      });


      if (!matchedProduct) {
        return customHttpException('Product Not Found!', 'NOT_FOUND');
      }

      return matchedProduct;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

}
