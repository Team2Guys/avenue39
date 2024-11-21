import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  ValidateNested,
  isNumber,
} from 'class-validator';

export class CreateSalesRecordDto {
  @IsEmail()
  user_email: string;

  @IsNumber()
  amount: number;

  @IsString()
  country: string;

  @IsString()
  address: string;

  @IsString()
  first_name: string;

  @IsString()
  city: string;

  @IsNumber()
  phone_number: Number;

  @IsString()
  last_name: string;

  @IsString()
  @IsOptional()
  note: string;

  @IsNumber()
  shippment_Fee: number | string;

  orderedProductDetails: any[];
}

export interface CreateSalesRecordDto {
  user_email: string;
  country: string;

  products: any[];
}

export interface CreateSalesRecordProductDto {
  quantity: number;
  productData: any;
}

export class updatePaymentStatusDto {
  @IsString()
  orderId: string;

  @IsString()
  paymentStatus: string;
}
