import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for a single todo object
export interface TodoType {
  description: string | null;
  isCompleted: boolean | null;
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

    // Update a todo at a specific index
    updateTodo: (state, action: PayloadAction<{ index: number | null; todo: Partial<TodoType> }>) => {
      const { index, todo } = action.payload;

      console.log(index);

      if (index !== null) {
        state.todos[index] = { ...state.todos[index], ...todo };
      } else {
        console.log("Index is null");
      }
    },

    // Delete a todo at a specific index
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.todos.splice(index, 1);
    },
  },
});

export const { addTodo, updateTodo, deleteTodo } = TodoSlice.actions;
export default TodoSlice.reducer;