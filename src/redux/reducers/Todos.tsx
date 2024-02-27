// src/redux/reducers/customerSettingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodosType {
  statusId: number | null;
  customerId: number;
  notificationStatus: boolean;
  TFASetting: string;
  darkMode: boolean;
  isArabic: boolean;
}

const initialState: TodosType = {
  statusId: null,
  customerId: 0,
  isArabic: false,
  notificationStatus: true,
  darkMode: true,
  TFASetting: '',
};

const TodoSlice:any = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    updateTodo: (state, action: PayloadAction<Partial<TodosType>>) => {
      return { ...state, ...action.payload };
    },
    addTodo: (state, action: PayloadAction<Partial<TodosType>>) => {
      return { ...state, ...action.payload };
    },
    deleteTodo: (state, action: PayloadAction<Partial<TodosType>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateTodo, addTodo, deleteTodo } = TodoSlice.actions;
export default TodoSlice.reducer;