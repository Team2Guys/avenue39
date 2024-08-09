import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { AddProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    try {
      return this.prisma.products.findMany({});
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addProduct(productData: AddProductDto) {
    try {
      const { name } = productData;
      const existingProduct = await this.prisma.products.findFirst({
        where: { name },
      });

      if (!existingProduct) {
        await this.prisma.products.create({
          data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            stock: productData.stock,
            discountPrice: productData.discountPrice ?? null,
            posterImageUrl: productData.posterImageUrl,
            posterImagePublicId: productData.posterImagePublicId,
            hoverImageUrl: productData.hoverImageUrl ?? null,
            hoverImagePublicId: productData.hoverImagePublicId ?? null,
            productImages: productData.productImages ?? [],
            additionalInformation: productData.additionalInformation ?? [],
            categoriesId: productData.categoriesId ?? null, // Handle optional field
          },
        });

        return {
          message: 'Product created successfully',
          status: HttpStatus.OK,
        };
      } else {
        await this.prisma.products.update({
          where: { id: existingProduct.id },
          data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            stock: productData.stock,
            discountPrice: productData.discountPrice ?? null,
            posterImageUrl: productData.posterImageUrl,
            posterImagePublicId: productData.posterImagePublicId,
            hoverImageUrl: productData.hoverImageUrl ?? null,
            hoverImagePublicId: productData.hoverImagePublicId ?? null,
            productImages:
              productData.productImages ?? existingProduct.productImages,
            additionalInformation:
              productData.additionalInformation ??
              existingProduct.additionalInformation,
            categoriesId:
              productData.categoriesId ?? existingProduct.categoriesId,
          },
        });

        return {
          message: 'Product updated successfully',
          status: HttpStatus.OK,
        };
      }
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
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
