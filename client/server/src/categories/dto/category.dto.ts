import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
} from 'class-validator';
export class AddCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
