import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mainReducer, { productReducer } from '@mainSlice/index';
import cartReducer from '@cartSlice/index';
import drawerReducer from '@drawerSlice/index';
import { initMainState, initProductState } from '@mainSlice/init';
import { initCartState } from './slices/cart/init';
import { initCartDrawerState } from './slices/drawer/init';
import usrSlice from './slices/user/userSlice';
import usersSlice from './slices/Admin/AdminsSlice';

const persistConfig = {
  key: 'root',
  storage,
  migrate: (state: any) => {
    const { _persist = {} } = state || {};
    const main = { ...initMainState, ...(state?.main || {}) };
    const cart = { ...initCartState, ...(state?.cart || {}) };
    // const products = { ...initProductState, ...(state?.products || {}) };
    const drawer =
      typeof state?.drawer === 'boolean' ? state.drawer : initCartDrawerState;
    return Promise.resolve({ _persist, main, cart, drawer });
  },
};

const rootReducer = combineReducers({
  main: mainReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  products: productReducer,

  usersSlice: usersSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
