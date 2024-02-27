// src/redux/reducers/customerSettingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DarkModeType {
    darkMode: boolean;
}

const initialState: DarkModeType = {
    darkMode: false
};

const DarkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        setDarkMode: (state, action: PayloadAction<Partial<DarkModeType>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setDarkMode: changeDarkMode } = DarkModeSlice.actions;
export default DarkModeSlice.reducer;