// src/redux/reducers/customerSettingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToggleModalType {
    showModal: boolean;
}

const initialState: ToggleModalType = {
    showModal: false
};

const DarkModeSlice = createSlice({
    name: 'toggleModal',
    initialState,
    reducers: {
        setShowModal: (state, action: PayloadAction<Partial<ToggleModalType>>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setShowModal: updateToggleModal } = DarkModeSlice.actions;
export default DarkModeSlice.reducer;