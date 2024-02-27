// src/redux/reducers/customerSettingsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DeleteType {
    showDelete: boolean;
    checkedTodos: number[]
}

const initialState: DeleteType = {
    showDelete: false,
    checkedTodos: []
};

const DeleteSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        setDelete: (state, action: PayloadAction<Partial<DeleteType>>) => {
            return { ...state, ...action.payload };
        },
        addCheckedTodo: (state, action: PayloadAction<number>) => {
            state.checkedTodos.push(action.payload);
        },
        removeCheckedTodo: (state, action: PayloadAction<number>) => {
            state.checkedTodos = state.checkedTodos.filter(todo => todo !== action.payload);
        },
        removeAllCheckedTodos: (state) => {
            state.checkedTodos = [];
        }
    },
});

export const { setDelete: updateDelete, addCheckedTodo, removeCheckedTodo, removeAllCheckedTodos } = DeleteSlice.actions;
export default DeleteSlice.reducer;