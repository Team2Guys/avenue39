import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { PaytabsService } from './paytabs.service';
import { CreatePaymentDto } from './dto/paytabs.dto';
import { Response } from 'express';

@Controller('paytabs')
export class PaytabsController {
  constructor(private readonly paytabsService: PaytabsService) {}

  @Post('create-payment')
  async createPayment(
    @Body() paymentDetails: CreatePaymentDto,
    @Res() res: Response,
  ) {
    const response = await this.paytabsService.createPayment(paymentDetails);
    return res.json(response);
  }

  @Get('check-payment/:transactionRef')
  async checkPaymentStatus(
    @Param('transactionRef') transactionRef: string,
    @Res() res: Response,
  ) {
    const response =
      await this.paytabsService.checkPaymentStatus(transactionRef);
    return res.json(response);
  }
}
