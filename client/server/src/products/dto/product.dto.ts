import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
} from 'class-validator';
export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  stock: number;

  @IsOptional()
  @IsInt()
  discountPrice?: number;

  @IsNotEmpty()
  @IsString()
  posterImageUrl: string;

  @IsNotEmpty()
  @IsString()
  posterImagePublicId: string;

  @IsOptional()
  @IsString()
  hoverImageUrl?: string;

  @IsOptional()
  @IsString()
  hoverImagePublicId?: string;

  @IsOptional()
  @IsArray()
  productImages: { imageUrl: string; public_id: string }[];

  @IsOptional()
  @IsArray()
  additionalInformation: { colors?: string[]; dimension?: string[] }[];

  @IsNotEmpty()
  @IsInt()
  categoriesId: number;
}
