import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  ArrayNotEmpty,
} from 'class-validator';
export class AddSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  categoriesId: number[];

  posterImageUrl;

  categories;
}
export class UpdateSubCategoryDto extends AddSubCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
