import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { CreatePaymentDto } from './dto/paytabs.dto';

@Injectable()
export class PaytabsService {
  private readonly PAYTABS_API_URL = process.env.PAYTABS_API_URL;
  private readonly PAYTABS_QUERY_URL = process.env.PAYTABS_QUERY_URL;
  private readonly SERVER_KEY = process.env.PAYTABS_SERVER_KEY;
  private readonly PROFILE_ID = process.env.PAYTABS_PROFILE_ID;
  private readonly PAYMOD_CURRENCY = process.env.PAYMOD_CURRENCY;

  async createPayment(paymentDetails: CreatePaymentDto) {
    console.log('alyo');
    console.log(paymentDetails);
    const { firstName, lastName, email, phoneNumber, state, country, amount } =paymentDetails;

      
    const requestBody = {
      profile_id: this.PROFILE_ID,
      tran_type: 'sale',
      tran_class: 'ecom',
      cart_id: 'orderId',
      cart_description: `Order for ${firstName} ${lastName}`,
      cart_currency: 'AED',
      cart_amount: amount,
      framed: true,
      framed_return_top: true,
      framed_return_parent: true,
      callback: 'http://avenue39.vercel.app/thanks',
      // return: 'http://avenue39.vercel.app/thanks',
      return: 'http://localhost:3000/thanks',
      customer_details: {
        name: `${firstName} ${lastName}`,
        email,
        phone: phoneNumber,
        street1: 'Street Address',
        city: 'City',
        state,
        country,
        ip: '127.0.0.1',
      },
    };

    try {
      const response = await axios.post(this.PAYTABS_API_URL, requestBody, {
        headers: {
          Authorization: this.SERVER_KEY,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data, "response")
      return response.data;
    } catch (error) {
      console.error('Payment API Error:', error);
      throw new Error(error.response.data.message || 'Payment request failed');
    }
  }


  async checkPaymentStatus(transactionRef: string): Promise<any> {
    const headers = {
      Authorization: this.SERVER_KEY,
      'Content-Type': 'application/json',
    };

    const body = {
      profile_id: this.PROFILE_ID,
      tran_ref: transactionRef,
    };

    try {
      const response: AxiosResponse = await axios.post(
        this.PAYTABS_QUERY_URL,
        body,
        { headers },
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        {
          message: 'Unable to check payment status',
          error: error.response?.data,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  
}
