import icon3 from '@icons/3.png';
import diningTable from '@assets/menu-icons/dining-table.png';
import diningChair from '@assets/menu-icons/dining-chair.png';
// import accessories from '@assets/menu-icons/furnitures.png';
import sideCabinets from '@assets/menu-icons/cabinet.png';
import sideTable from '@assets/menu-icons/side-table.png';
import sofa from '@assets/menu-icons/sofa.png';
import armchair from '@assets/menu-icons/armchair.png';
import sofaBed from '@assets/menu-icons/sofa-bed.png';
import accentChairs from '@assets/menu-icons/chair.png';
import officeChair from '@assets/menu-icons/office-chair.png';
import tvCabinets from '@assets/menu-icons/tv.png';
import coffeeTables from '@assets/menu-icons/coffee-table.png';
import tableLamps from '@assets/menu-icons/lamps.png';
import bedsideTables from '@assets/menu-icons/bedside-table.png';
import barstool from '@assets/menu-icons/bar-stool.png';
import officeTables from '@assets/menu-icons/desktop.png';
import floorLamps from '@assets/menu-icons/floor-lamp.png';
import { MenuData } from '@/types/types';

export const menuData: MenuData = {
  dining: [
    {
      categoryId: 3,
      link: '/products',
      title: 'Dining Tables',
      icon: diningTable,
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Dining Chairs',
      icon: diningChair,
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'Side Cabinets',
      icon: sideCabinets,
    },
    {
      categoryId: 3,
      link: '/products',
      title: 'TV Stands',
      icon: tvCabinets,
    },
    // {
    //   categoryId: 3,
    //   link: '/products',
    //   title: 'Accessories',
    //   icon: accessories,
    // },
    // { link: '/products', title: 'Sale', icon: "/images/sale.png" }
  ],
  living: [
    {
      categoryId: 4,
      link: '/products',
      title: 'Sofas',
      icon: sofa,
    },

    { categoryId: 4, link: '/products', title: 'Armchairs', icon: armchair },
    {
      categoryId: 4,
      link: '/products',
      title: 'Accent Chairs',
      icon: accentChairs,
    },
    {
      categoryId: 4,
      link: '/products',
      title: 'TV Stands',
      icon: tvCabinets,
    },
    { categoryId: 4, link: '/products', title: 'Side Tables', icon: sideTable },
    {
      categoryId: 4,
      link: '/products',
      title: 'Coffee Tables',
      icon: coffeeTables,
    },
    { categoryId: 4, link: '/products', title: 'Sofa Beds', icon: sofaBed },
    // {
    //   categoryId: 4,
    //   link: '/products',
    //   title: 'Accessories',
    //   icon: accessories,
    // },
    // { link: '/products', title: 'Sale', icon: '/images/sale.png' },
  ],
  bedroom: [
    {
      categoryId: 5,
      link: '/products',
      title: 'Table Lamps',
      icon: tableLamps,
    },
    {
      categoryId: 5,
      link: '/products',
      title: 'Bedside Tables',
      icon: bedsideTables,
    },
    {
      categoryId: 5,
      link: '/products',
      title: 'Accent Chairs',
      icon: accentChairs,
    },
    {
      categoryId: 5,
      link: '/products',
      title: 'TV Stands',
      icon: tvCabinets,
    },
    { categoryId: 5, link: '/products', title: 'Sofa Beds', icon: sofaBed },
    // {
    //   categoryId: 5,
    //   link: '/products',
    //   title: 'Accessories',
    //   icon: accessories,
    // },
    // { link: '/products', title: 'Sale', icon: '/images/sale.png' },
  ],
  homeOffice: [
    {
      categoryId: 8,
      link: '/products',
      title: 'Office furniture',
      icon: officeTables,
    },
    {
      categoryId: 8,
      link: '/products',
      title: 'Office Chairs',
      icon: officeChair,
    },
    {
      categoryId: 8,
      link: '/products',
      title: 'Office Desks',
      icon: officeChair,
    },
    // { link: '/products', title: 'Sale', icon: '/images/sale.png' },
  ],
  chairs: [
    { categoryId: 6, link: '/products', title: 'Armchairs', icon: armchair },
    {
      categoryId: 6,
      link: '/products',
      title: 'Accent Chairs',
      icon: accentChairs,
    },
    { categoryId: 6, link: '/products', title: 'Sofas', icon: sofa },
    {
      categoryId: 6,
      link: '/products',
      title: 'Dining Chairs',
      icon: diningChair,
    },
    { categoryId: 6, link: '/products', title: 'Barstools', icon: barstool },
    // { link: '/products', title: 'Sale', icon: '/images/sale.png' },
  ],
  tables: [
    {
      categoryId: 7,
      link: '/products',
      title: 'Dining Tables',
      icon: diningTable,
    },
    {
      categoryId: 7,
      link: '/products',
      title: 'Office Desks',
      icon: officeTables,
    },
    { categoryId: 7, link: '/products', title: 'Side Tables', icon: sideTable },
    {
      categoryId: 7,
      link: '/products',
      title: 'Coffee Tables',
      icon: coffeeTables,
    },
    {
      categoryId: 7,
      link: '/products',
      title: 'Bedside Tables',
      icon: bedsideTables,
    },
    // { link: '/products', title: 'Sale', icon: '/images/sale.png' },
  ],

  Lighting: [
    {
      categoryId: 9,
      link: '/products',
      title: 'Floor Lamps',
      icon: floorLamps,
    },
    {
      categoryId: 9,
      link: '/products',
      title: 'Table Lamps',
      icon: tableLamps,
    },
    // { link: '/products', title: 'Sale', icon: '/images/sale.png' },
  ],
  Accessories: [{ link: '/products', title: 'Accessories', icon: icon3 }],
  'New Arrivals': [{ link: '/products', title: 'New Arrivals', icon: icon3 }],
    // Sale: [{ link: '/products', title: 'Sale', icon: icon3 }],
};

export const staticHeaderCategories: string[] = [
  'Dining',
  'living',
  'Bedroom',
  'Home Office',
  'Chairs',
  'Tables',
  'Lighting',
  // 'Clearance',
  'Accessories',
  'New Arrivals',
  // 'Sale',
];
