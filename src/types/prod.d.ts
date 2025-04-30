import { StaticImageData } from 'next/image';
import { ICategory } from './cat';


export interface specsDetails {
    id: number;
    specsDetails: string;
}

export interface ProductImage {
    imageUrl: string;
    public_id: string;
    altText?: string;
    imageIndex?: number;
    index?: string;

    size?: string;

    color?: string;
}
interface Filter {
    heading: string;
    additionalInformation: {
        name: string;
        price: string;
        discountPrice: string;
        stock?: number;
    }[];
}

export interface Sizes {
    name: string;
    filterName?: string;
    price: string;
    discountPrice: string;
    stock?: string;
}





export interface Shipping {
    icon: string;
    name: string;
    description: string;
    shippingFee: number;
    otherEmiratesFee?: number;
    freeShippingFee?: number;
  }

export interface AdditionalInformation {
    key?: string;
    value?: string;
    colors?: string[];
    dimension?: string[];
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    discountPrice: number;
    sale?: string;
    colors?: [];
    spacification?: specsDetails[];
    posterImageUrl: string | StaticImageData;
    posterImagePublicId: string;
    posterImageAltText?: string;
    hoverImageUrl: string;
    hoverImagePublicId: string;
    productImages: ProductImage[];
    additionalInformation: AdditionalInformation[];
    categoriesId: number;
    categories?: ICategory[];
    subcategories?: ICategory[];
    sections?: [];
    createdAt?: string;
    sale_counter?: string;
    sortedSubcategories?: ICategory[];
    sizes?: Sizes[];
    filter?: Filter[];
    reviews?: any[]
    displayName?: string;
    sizeName?: string;
    colorName?: string;
    custom_url?: string;
    shippingOptions?: Shipping[];
    selectedShipping?: Shipping;
    HomeProductImage?: ProductImage
}



export interface IProductAdd {
    name: string;
    price: number;
    description: string;
    stock: number;
    discountPrice: number;
    posterImageUrl: string;
    posterImagePublicId: string;
    hoverImageUrl: string;
    hoverImagePublicId: string;
    productImages: ProductImage[];
    spacification: Array<{ specsDetails: string; _id: string }>;
    sizes?: string[];
    additionalInformation: AdditionalInformation[];
    categories: number[];
    subcategories: number[];
    Meta_Title: string;
    Canonical_Tag: string;
    Meta_Description: string;
    Images_Alt_Text: string;
    sale_counter?: string;
    filters?: any[];
    custom_url?:string;
    shippingOptions: Shipping[]
  }
  