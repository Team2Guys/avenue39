import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initMainState } from './init';

const MainSlice = createSlice({
  name: 'main',
  initialState: initMainState,
  reducers: {
    setDummy: (state, action: PayloadAction<string>) => {
      state.dummy = action.payload;
    },
  },
});

export const { setDummy } = MainSlice.actions;
export default MainSlice.reducer;
