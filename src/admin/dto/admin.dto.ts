import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import { PartialType } from '@nestjs/swagger';

export class AdminLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class createAdminDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  canAddProduct: boolean;
  @IsBoolean()
  @IsOptional()
  canEditProduct: boolean;
  @IsBoolean()
  @IsOptional()
  canDeleteProduct: boolean;
  @IsBoolean()
  @IsOptional()
  canEditCategory: boolean;
  @IsBoolean()
  @IsOptional()
  canCheckProfit: boolean;
  @IsBoolean()
  @IsOptional()
  canCheckRevenue: boolean;
  @IsBoolean()
  @IsOptional()
  canCheckVisitors: boolean;
  @IsBoolean()
  @IsOptional()
  canViewUsers: boolean;
  @IsBoolean()
  @IsOptional()
  canVeiwAdmins: boolean;
  @IsBoolean()
  @IsOptional()
  canVeiwTotalproducts: boolean;
  @IsBoolean()
  @IsOptional()
  canVeiwTotalCategories: boolean;

  @IsString()
  @IsOptional()
  posterImageUrl: string;

  @IsString()
  @IsOptional()
  posterImagePublicId: string;
}

export class editAdminDto extends createAdminDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  password: string;
}

export class adminHandlerDto {
  @IsNotEmpty()
  @IsNumber()
  email: string;
}
