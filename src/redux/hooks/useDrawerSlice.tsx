import { useSelector, useDispatch } from 'react-redux';
import { State, Dispatch } from '../store';
import { closeDrawer, openDrawer } from '../slices/drawer';
import { CartDrawer } from '../slices/drawer/types';

export const useDrawer = () => {
  const dispatch = useDispatch<Dispatch>();

  const setOpenDrawer = () => dispatch(openDrawer());
  const setCloseDrawer = () => dispatch(closeDrawer());

  return {
    setOpenDrawer,
    setCloseDrawer,
  };
};
