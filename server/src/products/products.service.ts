import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { AddProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    try {
      console.log(this.prisma.products.findMany({}));
      return this.prisma.products.findMany({
        include: {
          categories: {
            include: {
              subcategories: true,
            },
          },
          subcategories: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addProduct(productData: AddProductDto) {
    console.log('Add product triggered');
    console.log(productData);
    try {
      const existingProduct = await this.prisma.products.findFirst({
        where: { name: productData.name },
      });
       //@ts-expect-error
       const { id,imagesUrl,OgUrl,Og_Image,Og_title,...Data } = productData;

      if (existingProduct) {
        return {
          message: 'Product with this name already exists!',
          status: HttpStatus.FORBIDDEN,
        };
      }

      await this.prisma.products.create({
        data: {
          ...Data,
          hoverImageUrl: productData.hoverImageUrl ?? null,
          hoverImagePublicId: productData.hoverImagePublicId ?? null,
          categories: {
            connect: productData.categories.map((id) => ({ id })),
          },
          subcategories: {
            connect: productData.subcategories.map((id) => ({ id })),
          },
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
  async updateProduct(productData: UpdateProductDto) {
    console.log('Update product triggered');
    console.log(productData);
    try {
      const existingProduct: any = await this.prisma.products.findFirst({
        where: { id: productData.id },
      });
      
      
      //@ts-expect-error
      const { id,imagesUrl,OgUrl,Og_Image,Og_title,...Data } = productData;

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

      await this.prisma.products.update({
        where: { id: productData.id },
        data: {
          ...Data,
          colors: colors ?? existingProduct.colors ?? [],
          categories: {
            set: productData.categories?.map((id) => ({ id })) ?? [],
          },
          subcategories: {
            set: productData.subcategories?.map((id) => ({ id })) ?? [],
          },
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
}
