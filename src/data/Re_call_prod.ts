export interface recallingTypes {
  id:number,
  mainCategory: string,
  subCategory: string,
  redirectsubCat: string,
  redirect_main_cat:string,
  customUrl?: string,
  subcustomUrl?: string,

}

export const re_Calling_products:recallingTypes[] = [
  {
    id: 1,
    mainCategory: 'CHAIRS',
    subCategory: 'Sofas',
    ////////////////
    redirectsubCat: 'Sofas',
    redirect_main_cat: 'LIVING',
    customUrl:"",
    subcustomUrl:""
  },
  {
    id: 2,
    mainCategory: 'LIVING',
    subCategory: 'Armchairs',
    ////////////////
    redirectsubCat: 'Armchairs',
    redirect_main_cat: 'CHAIRS',
  },

  {
    id: 3,
    mainCategory: 'LIVING',
    subCategory: 'Accent Chairs',
    ////////////////
    redirectsubCat: 'Accent Chairs',
    redirect_main_cat: 'CHAIRS',
  },
  {
    id: 4,
    mainCategory: 'LIVING',
    subCategory: 'Coffee Tables',
    ////////////////
    redirectsubCat: 'Coffee Tables',
    redirect_main_cat: 'TABLES',
  },
  {
    id: 4,
    mainCategory: 'LIVING',
    subCategory: 'Side Tables',
    ////////////////
    redirectsubCat: 'Side Tables',
    redirect_main_cat: 'TABLES',
  },

  {
    id: 5,
    mainCategory: 'BEDROOM',
    subCategory: 'Table Lamps',
    ////////////////
    redirectsubCat: 'Table Lamps',
    redirect_main_cat: 'LIGHTING',
  },

  {
    id: 6,
    mainCategory: 'BEDROOM',
    subCategory: 'Accent Chairs',
    ////////////////
    redirectsubCat: 'Accent Chairs',
    redirect_main_cat: 'CHAIRS',
  },
  {
    id: 6.5,
    mainCategory: 'BEDROOM',
    subCategory: 'Sofa Beds',
    ////////////////
    redirectsubCat: 'Sofa Beds',
    redirect_main_cat: 'LIVING',
  },
  {
    id: 7,
    mainCategory: 'CHAIRS',
    subCategory: 'Chairs',
    ////////////////
    redirectsubCat: 'Chairs',
    redirect_main_cat: 'DINING',
  },
  {
    id: 8,
    mainCategory: 'TABLES',
    subCategory: 'tables',
    ////////////////
    redirectsubCat: 'tables',
    redirect_main_cat: 'DINING',
  },
  {
    id: 9,
    mainCategory: 'TABLES',
    subCategory: 'Office Tables',
    ////////////////
    redirectsubCat: 'Office Tables',
    redirect_main_cat: 'office-furniture',
  },
  {
    id: 11,
    mainCategory: 'TABLES',
    subCategory: 'Bedside Tables',
    ////////////////
    redirectsubCat: 'Bedside Tables',
    redirect_main_cat: 'BEDROOM',
  },
  {
    id: 12,
    mainCategory: 'TABLES',
    subCategory: 'Bedside Tables',
    ////////////////
    redirectsubCat: 'Bedside Tables',
    redirect_main_cat: 'BEDROOM',
  },
  {
    id: 13,
    mainCategory: 'TABLES',
    subCategory: 'Bedside Tables',
    ////////////////
    redirectsubCat: 'Bedside Tables',
    redirect_main_cat: 'BEDROOM',
  },
  {
    id: 14,
    mainCategory: 'TABLES',
    subCategory: 'Bedside Tables',
    redirectsubCat: 'Bedside Tables',
    redirect_main_cat: 'BEDROOM',
  },
  {
    id: 15,
    mainCategory: 'LIVING',
    subCategory: 'TV Stands',
    redirectsubCat: 'TV Stands',
    redirect_main_cat: 'BEDROOM',
  },
  
  {
    id: 15,
    mainCategory: 'DINING',
    subCategory: 'TV Stands',
    redirectsubCat: 'TV Stands',
    redirect_main_cat: 'BEDROOM',
  },
];
