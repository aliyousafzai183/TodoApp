// src/redux/reducers/customerSettingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BusinessSettings {
  statusId: number | null;
  customerId: number;
  notificationStatus: boolean;
  TFASetting: string;
  darkMode: boolean;
  isArabic: boolean;
}

const initialState: BusinessSettings = {
  statusId: null,
  customerId: 0,
  isArabic: false,
  notificationStatus: true,
  darkMode: true,
  TFASetting: '',
};

const BusinessSliceSettings:any = createSlice({
  name: 'customerSettings',
  initialState,
  reducers: {
    updateBusinessSettings: (state, action: PayloadAction<Partial<BusinessSettings>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateBusinessSettings: updateSettings } = BusinessSliceSettings.actions;
export default BusinessSliceSettings.reducer;