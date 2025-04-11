export interface ICategory {
  id: number;
  name: string;
  createdAt?: string;
  posterImageUrl?: string;
  posterImagePublicId?: string;
  categories?: any;
  description?: string;
  short_description?: string;
  Images_Alt_Text?: string;
  Meta_Title?: string;
  Meta_Description?: string;
  Canonical_Tag?: string;
  subcategories?: ICategory[];
  custom_url?:string
}



export interface ISUBCATEGORY {
  id: number;
  name: string;
  createdAt?: string;
  posterImageUrl?: string;
  posterImagePublicId?: string;
  categories?: any;
  description?: string;
  short_description?: string;
  Images_Alt_Text?: string;
  meta_title?: string;
  meta_description?: string;
  canonical_tag?: string;
  custom_url?:string
}