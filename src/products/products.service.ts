import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException, generateSlug } from '../utils/helper';
import { AddProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }
  async getProducts() {
    try {
      let products = await this.prisma.products.findMany({
        select: {
          id: true,
          posterImageUrl: true,
          name: true,
          custom_url: true,
          reviews: true,
          description: true,
          stock: true,
          hoverImageUrl: true,
          price: true,
          discountPrice: true,
          sizes: true,
          filter: true,
          additionalInformation: true,
          productImages: true,

          categories: {
            select: {
              name: true,
              custom_url: true,
              short_description: true
            }
          },
          subcategories: {
            select: {
              name: true,
              custom_url: true
            }
          }
        }

      });
      return products
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getHeaderProducts() {
    try {
      let products = await this.prisma.products.findMany({
        select: {
          id: true,
          posterImageUrl: true,
          name: true,
          custom_url: true,
          stock: true,
          price: true,
          discountPrice: true,
          sizes: true,
          filter: true,
          productImages: true,
          categories: {
            select: {
              name: true,
              custom_url: true,
            }
          },
          subcategories: {
            select: {
              name: true,
              custom_url: true
            }
          }
        }

      });
      return products
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }


  async getAllProducts() {
    try {
      console.log("product function Called")
      let products = await this.prisma.products.findMany({
        include: {
          reviews: true,
          categories: {
            include: {
              subcategories: true,

            },
          },
          subcategories: {
            include: {
              categories: true,
            },
          },
        },
      });
      return products
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addProduct(productData: AddProductDto, userEmail: string) {
    try {
      const existingProduct = await this.prisma.products.findFirst({
        where: { name: productData.name },
      });
      //@ts-expect-error
      const { id, imagesUrl, OgUrl, Og_Image, Og_title, ...Data } = productData;

      if (existingProduct) {
        return {
          message: 'Product with this name already exists!',
          status: HttpStatus.FORBIDDEN,
        };
      }
      //@ts-expect-error
      const { filters, filtere, ...filteredData } = Data;

      await this.prisma.products.create({
        data: {
          ...filteredData,
          hoverImageUrl: productData.hoverImageUrl ?? null,
          hoverImagePublicId: productData.hoverImagePublicId ?? null,
          categories: {
            connect: productData.categories.map((id) => ({ id })),
          },
          subcategories: {
            connect: productData.subcategories.map((id) => ({ id })),
          },
          last_editedBy: userEmail,

        },
      });

      return {
        message: 'Product created successfully 🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateProduct(productData: UpdateProductDto, userEmail: string) {

    try {
      const existingProduct: any = await this.prisma.products.findFirst({
        where: { id: productData.id },
      });


      //@ts-expect-error
      const { id, imagesUrl, OgUrl, Og_Image, Og_title, ...Data } = productData;

      if (!existingProduct) {
        return {
          message: 'Product not found☹',
          status: HttpStatus.FORBIDDEN,
        };
      }

      const colors =
        productData.colors?.map(
          (color: { colorName: string }) => color.colorName,
        ) ?? [];

      //@ts-expect-error
      const { filters, ...filteredData } = Data;

      await this.prisma.products.update({
        where: { id: productData.id },
        data: {
          ...filteredData,
          colors: colors ?? existingProduct.colors ?? [],
          categories: {
            set: productData.categories?.map((id) => ({ id })) ?? [],
          },
          subcategories: {
            set: productData.subcategories?.map((id) => ({ id })) ?? [],
          },
          last_editedBy: userEmail,
        },


      });

      return {
        message: 'Product updated successfully 🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeProduct(id: number) {
    try {
      const productExist = await this.prisma.products.findUnique({
        where: { id },
      });

      if (!productExist) {
        return {
          message: 'Product does not exist ☹',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.products.delete({
        where: { id },
      });

      return {
        message: 'Product removed successfully 😊',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error removing product:', error);
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }

  async getSingeProduct(productSlug: string) {
    try {
      const products = await this.prisma.products.findMany({
        select: {
          Meta_Title: true,
          Meta_Description: true,
          posterImageUrl: true,
          Canonical_Tag: true,
          Images_Alt_Text: true,
          posterImageAltText: true,
          name: true,
          custom_url: true,
        },
      });

      const matchedProduct = products.find((product) => {
        const nameSlug = generateSlug(product.name.trim());
        const customUrlSlug = product.custom_url
          ? generateSlug(product.custom_url.trim())
          : null;

        return (
          nameSlug.toLowerCase() === productSlug.toLowerCase() ||
          customUrlSlug === productSlug.toLowerCase()
        );
      });

      console.log(productSlug, "matchedProduct")
      if (!matchedProduct) {
        return customHttpException('Product Not Found!', 'NOT_FOUND');
      }

      return matchedProduct;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }





  getPaginatedProducts = async (categoryname: string, page = 1, pageSize = 5) => {
    const skip = (page - 1) * pageSize;
    const otherProducts = await this.prisma.products.findMany({
      where: {
        categories: {
          some: {
            name: categoryname,
          },
        },
      },
      skip: skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        posterImageUrl: true,
        posterImageAltText: true,
        stock: true,
        price: true,
        discountPrice: true
      }
    });



    const totalProductsCount = await this.prisma.products.count({
      where: {
        categories: {
          some: {
            name: categoryname,
          },
        },
      },
    });

    const totalPages = Math.ceil(totalProductsCount / pageSize);

    return {
      products: otherProducts,
      totalPages,
      totalAccessoryProducts:totalProductsCount
    };
  };


}
