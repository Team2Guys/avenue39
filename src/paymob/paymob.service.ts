import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/paymob.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PaymobService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  private async generateToken(): Promise<string> {
    try {
      const apiKey = process.env.PAYMOB_API_KEY;
      if (!apiKey) {
        throw new HttpException(
          'API Key is not set in environment variables.',
          500,
        );
      }

      const response = await this.httpService.post(`${process.env.PAYMOD_BASE_URL}/auth/tokens`, {api_key: apiKey,}).toPromise();

      return response.data.token;
    } catch (error) {
      console.log(error, "erro")
      throw new HttpException(error.message || 'Token generation failed.', 500);
    }
  }

  async authenticate(): Promise<{ token: string }> {
    const token = await this.generateToken();
    return { token };
  }

  async createOrder(
    amount: number,
    items: any[],
    token: string,
  ): Promise<{ orderId: string }> {
    try {
      const orderResponse = await this.httpService
        .post(`${process.env.PAYMOD_BASE_URL}/ecommerce/orders`, {
          auth_token: token,
          delivery_needed: false,
          amount_cents: amount * 100,
          currency: process.env.PAYMOD_CURRENCY,
          merchant_id: process.env.PAYMOB_MERCHANT_ID,
          items,
        })
        .toPromise();

      return { orderId: orderResponse.data.id };
    } catch (error) {
      throw new HttpException(error.message || 'Order creation failed.', 500);
    }
  }

  async generatePaymentKey(data: any): Promise<{ paymentKey: string }> {
    console.log('aylo from payment key');
    console.log(data);

    const {
      token,
      orderId,
      amount,
      billingData,
      orderedProductDetails,
      shipmentFee,
    } = data;

    const { firstName, lastName, phone, ...otherDetails } = billingData;

    const billingDetails = {
      first_name: firstName || '-',
      last_name: lastName || '-',
      phone_number: phone || '',
      street: '-',
      building: '-',
      floor: '-',
      apartment: '-',
      city: 'Dubai',
      country: 'United Arab Emirates',
      address: '-',
      ...otherDetails,
    };
    // const existingPayment = await this.prisma.payment.findUnique({
    //   where: { orderId },
    // });

    // if (existingPayment) {
    //   throw new HttpException('Order ID already exists', 400);
    // }
    console.log('Request payload:', {
      auth_token: token,
      amount_cents: amount * 100,
      expiration: 3600,
      order_id: orderId,
      billing_data: billingDetails,
      currency: process.env.PAYMOD_CURRENCY,
      integration_id: process.env.PAYMOB_INTEGRATION_ID,
    });

    const paymentKeyResponse = await this.httpService
      .post(`${process.env.PAYMOD_BASE_URL}/acceptance/payment_keys`, {
        auth_token: token,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderId,
        billing_data: billingDetails,
        currency: process.env.PAYMOD_CURRENCY,
        integration_id: process.env.PAYMOB_INTEGRATION_ID,
      })
      .toPromise();

    // await this.prisma.payment.create({
    //   data: {
    //     ...billingData,
    //     orderId,
    //     checkout: true,
    //     paymentStatus: false,
    //     shipmentFee,
    //     orderedProductDetails: {
    //       create: orderedProductDetails,
    //     },
    //   },
    // });

    return { paymentKey: paymentKeyResponse.data.token };
  }

  async checkPaymentStatus(orderId: string): Promise<{ status: string }> {
    try {
      const token = await this.generateToken();

      const response = await this.httpService
        .get(
          `https://pakistan.paymob.com/api/acceptance/transactions/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .toPromise();

      return { status: response.data.status };
    } catch (error) {
      throw new HttpException(
        error.message || 'Payment status check failed.',
        500,
      );
    }
  }
}
