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
  name: string;

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
  canViewAdmins: boolean;
  @IsBoolean()
  @IsOptional()
  canViewTotalProducts: boolean;
  @IsBoolean()
  @IsOptional()
  canViewTotalCategories: boolean;

  @IsString()
  @IsOptional()
  posterImageUrl: string;

  @IsString()
  @IsOptional()
  posterImagePublicId: string;
}
