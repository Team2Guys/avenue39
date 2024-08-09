import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { customHttpException } from 'src/utils/helper';
import { AddReviewDto } from './dto/reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  getReviews() {
    try {
      return this.prisma.reviews.findMany({});
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addReview(reviewData: AddReviewDto) {
    console.log(reviewData);
    try {
      await this.prisma.reviews.create({
        data: {
          ...reviewData,
        },
      });

      return {
        message: 'Review Added successfully 🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
}
