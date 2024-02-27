import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for a single todo object
export interface TodoType {
  description: string | null;
  isCompleted: boolean | null;
  index: number;
}

// Interface for the todos state (array of Todo objects)
export interface TodosArrayType {
  todos: TodoType[];
}

// Initial state with an empty array of todos
const initialState: TodosArrayType = {
  todos: [],
};

const TodoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new todo to the array
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todos.push(action.payload);
    },

    // Update a todo with a matching index
    updateTodo: (state, action: PayloadAction<{ index: number; todo: Partial<TodoType> }>) => {
      const { index, todo } = action.payload;
      const todoToUpdate = state.todos.find(t => t.index === index);
      if (todoToUpdate) {
        Object.assign(todoToUpdate, todo);
      }
    },

    // Delete a todo with a matching index
    deleteTodo: (state, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      console.log(indexToDelete);
      
      const index = state.todos.findIndex(t => t.index === indexToDelete);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = TodoSlice.actions;
export default TodoSlice.reducer;