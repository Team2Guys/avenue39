import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface IHome {}
export interface INav {}

export interface ITypo {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
export interface ITextIcon {
  //TODO: change Icon type
  Icon: any;
  Title: string;
}
