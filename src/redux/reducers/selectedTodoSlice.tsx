// src/redux/reducers/customerSettingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface selectedTodoType {
  description: string | null;
  index: number | null;
}

const initialState: selectedTodoType = {
  description: null,
  index: null
};

const SelectedTodoSlice = createSlice({
  name: 'selectedTodo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Partial<selectedTodoType>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSelectedTodo: updateSelectedTodo } = SelectedTodoSlice.actions;
export default SelectedTodoSlice.reducer;