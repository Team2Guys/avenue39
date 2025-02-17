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
    subCategory: 'desks',
    ////////////////
    redirectsubCat: 'desks',
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
    id: 16,
    mainCategory: 'DINING',
    subCategory: 'TV Stands',
    redirectsubCat: 'TV Stands',
    redirect_main_cat: 'BEDROOM',
  },
  {
    id: 16,
    mainCategory: 'DINING',
    subCategory: 'Barstools',
    redirectsubCat: 'Barstools',
    redirect_main_cat: 'CHAIRS',
  },

];



export const redirects:{url:string, redirect:string}[] = [
  { url: "collections/dining-table", redirect: "dining/tables" },
  { url: "collections/dining-chair", redirect: "dining/chairs" },
  { url: "collections/living-room-furniture", redirect: "living" },
  { url: "collections/side-cabinets", redirect: "living/side-cabinets" },
  { url: "collections/sofas", redirect: "living/sofas" },
  { url: "collections/sofa-beds", redirect: "living/sofa-beds" },
  { url: "collections/bedroom-furniture", redirect: "bedroom" },
  { url: "collections/bedside-tables", redirect: "bedroom/bedside-tables" },
  { url: "collections/tv-stand", redirect: "bedroom/tv-stands" },
  { url: "collections/office-furniture", redirect: "office-furniture" },
  { url: "collections/office-chairs", redirect: "office-furniture/chairs" },
  { url: "collections/office-tables", redirect: "office-furniture/desks" },
  { url: "collections/chairs", redirect: "chairs" },
  { url: "collections/armchairs", redirect: "chairs/armchairs" },
  { url: "collections/accent-chairs", redirect: "chairs/accent-chairs" },
  { url: "collections/barstools", redirect: "chairs/barstools" },
  { url: "collections/tables", redirect: "tables" },
  { url: "collections/side-tables", redirect: "tables/side-tables" },
  { url: "collections/coffee-table", redirect: "tables/coffee-tables" },
  { url: "collections/lighting", redirect: "lighting" },
  { url: "collections/floor-lamps", redirect: "lighting/floor-lamps" },
  { url: "collections/table-lamps", redirect: "lighting/table-lamps" },
  { url: "collections/accessories", redirect: "accessories" },
  { url: "pages/contact", redirect: "contact-us" },
  { url: "pages/about-us", redirect: "about-us" },
  { url: "pages/terms-conditions", redirect: "terms-and-conditions" },
  { url: "pages/privacy-policy", redirect: "privacy-policy" },
  { url: "pages/shipping-policy", redirect: "shipping-policy" },
  { url: "pages/return-policy", redirect: "return-policy" },
  { url: "collections/new-arrivals", redirect: "new-arrivals" },
  { url: "collections/clearance", redirect: "sale" },
  { url: "pages/wishlist", redirect: "wishlist" },
  { url: "collections/frontpage", redirect: "" },
  { url: "collections/all", redirect: "new-arrivals" },
  { url: "collections/living-storage", redirect: "living" },
];

