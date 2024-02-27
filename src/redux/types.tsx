// src/redux/types.ts
import { TodosArrayType } from "./reducers/Todos";
import { DarkModeType } from "./reducers/DarkModeSlice";
import { ToggleModalType } from "./reducers/ToggleModalSlice";
import { selectedTodoType } from "./reducers/selectedTodoSlice";

export interface RootState {
  Todos: TodosArrayType,
  DarkMode: DarkModeType,
  ToggleModal: ToggleModalType,
  SelectedTodo: selectedTodoType
}
