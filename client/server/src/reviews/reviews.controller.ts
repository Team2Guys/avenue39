import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { AddReviewDto } from './dto/reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/get-all')
  getReviews() {
    return this.reviewsService.getReviews();
  }

  @Post('add-review')
  addReview(@Body() reviewData: AddReviewDto) {
    return this.reviewsService.addReview(reviewData);
  }
}
