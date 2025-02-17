
import { MenuData } from '@/types/types';

export const menuData: MenuData = {
  dining: [
    {
      categoryId: 3,
      link: '/products',
      title: 'Dining Tables',
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Dining Chairs',
    
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Side Cabinets',
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'TV Stands',
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Barstools'
    },
  ],
  living: [
    {
      categoryId: 4,
      link: '/products',
      title: 'Sofas',

    },

    { categoryId: 4, link: '/products', title: 'Armchairs',},
    {
      categoryId: 4,
      link: '/products',
      title: 'Accent Chairs',

    },
    {
      categoryId: 4,
      link: '/products',
      title: 'TV Stands',

    },
    { categoryId: 4, link: '/products', title: 'Side Tables', },
    {
      categoryId: 4,
      link: '/products',
      title: 'Coffee Tables',

    },
    { categoryId: 4, link: '/products', title: 'Sofa Beds', },
  ],
  bedroom: [
    {
      categoryId: 5,
      link: '/products',
      title: 'Table Lamps',

    },
    {
      categoryId: 5,
      link: '/products',
      title: 'Bedside Tables',

    },
    {
      categoryId: 5,
      link: '/products',
      title: 'Accent Chairs',

    },
    {
      categoryId: 5,
      link: '/products',
      title: 'TV Stands',

    },
    { categoryId: 5, link: '/products', title: 'Sofa Beds' },
  ],
  homeOffice: [
    {
      categoryId: 8,
      link: '/products',
      title: 'Office furniture',

    },
    {
      categoryId: 8,
      link: '/products',
      title: 'Office Chairs',

    },
    {
      categoryId: 8,
      link: '/products',
      title: 'Office Desks',

    },
  ],
  chairs: [
    { categoryId: 6, link: '/products', title: 'Armchairs',},
    {
      categoryId: 6,
      link: '/products',
      title: 'Accent Chairs',

    },
    { categoryId: 6, link: '/products', title: 'Sofas' },
    {
      categoryId: 6,
      link: '/products',
      title: 'Dining Chairs',

    },
    { categoryId: 6, link: '/products', title: 'Barstools',  },
  ],
  tables: [
    {
      categoryId: 7,
      link: '/products',
      title: 'Dining Tables',

    },
    {
      categoryId: 7,
      link: '/products',
      title: 'Office Desks',
 
    },
    { categoryId: 7, link: '/products', title: 'Side Tables', },
    {
      categoryId: 7,
      link: '/products',
      title: 'Coffee Tables',
  
    },
    {
      categoryId: 7,
      link: '/products',
      title: 'Bedside Tables',

    },
  ],

  Lighting: [
    {
      categoryId: 9,
      link: '/products',
      title: 'Floor Lamps',

    },
    {
      categoryId: 9,
      link: '/products',
      title: 'Table Lamps',

    },
  ],
  Accessories: [{ link: '/products', title: 'Accessories', }],
  'New Arrivals': [{ link: '/products', title: 'New Arrivals', }],
};

export const staticHeaderCategories: string[] = [
  'Dining',
  'living',
  'Bedroom',
  'Home Office',
  'Chairs',
  'Tables',
  'Lighting',
  'Accessories',
  'New Arrivals',
  'Sale'
];
