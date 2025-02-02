import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  ArrayNotEmpty,
  isString,
  isArray,
} from 'class-validator';

export class AddProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  hoverImageAltText: string;

  @IsOptional()
  @IsString()
  Images_Alt_Text: string;

  @IsOptional()
  @IsString()
  posterImageAltText: string;

  @IsOptional()
  @IsString()
  Meta_Title: string;

  @IsOptional()
  @IsString()
  Meta_Description: string;
  @IsOptional()
  @IsString()
  Canonical_Tag: string;
  @IsOptional()
  @IsString()
  Og_title: string;
  @IsOptional()
  @IsString()
  Og_Image: string;
  @IsOptional()
  @IsString()
  Og_Url: string;

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
  @IsOptional()
  @IsArray()
  colors: [];

  @IsOptional()
  @IsArray()
  spacification: [];

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  categories: number[];

  @IsOptional()
  @IsArray()
  // @ArrayNotEmpty()
  @IsInt({ each: true })
  subcategories: number[];

  @IsOptional()
  @IsArray()
  sections: {
    heading: string;
    additionalInformation: { name?: string; detail: string }[];
  }[];

  @IsOptional()
  @IsString()
  sale_counter: string;



  @IsOptional()
  @IsString()
  meta_description: string;


  @IsOptional()
  @IsString()
  images_alt_text: string;


  @IsOptional()
  @IsArray()
  sizes: any[]

}

export class UpdateProductDto extends AddProductDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
