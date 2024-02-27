// src/redux/reducers/customerSettingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Loading {
  loading: boolean;
}

const initialState: Loading = {
    loading: false
};

const LoadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Partial<Loading>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setLoading: updateLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;