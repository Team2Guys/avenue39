import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymobService } from './paymob.service';

@Controller('payment')
export class PaymobController {
  constructor(private readonly paymobService: PaymobService) {}

  @Post('authenticate')
  async authenticate() {
    return this.paymobService.authenticate();
  }

  @Post('order')
  async createOrder(
    @Body() createOrderDto: { token: string; amount: number; items: any[] },
  ) {
    return this.paymobService.createOrder(
      createOrderDto.amount,
      createOrderDto.items,
      createOrderDto.token,
    );
  }

  @Post('payment-key')
  async generatePaymentKey(@Body() generatePaymentKeyDto: any) {
    return this.paymobService.generatePaymentKey(generatePaymentKeyDto);
  }

  @Get('status')
  async checkPaymentStatus(@Query('orderId') orderId: string) {
    if (!orderId) {
      throw new HttpException('orderId is required', HttpStatus.BAD_REQUEST);
    }
    return this.paymobService.checkPaymentStatus(orderId);
  }
}
