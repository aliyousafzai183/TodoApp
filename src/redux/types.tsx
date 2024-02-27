// src/redux/types.ts
import { TodosArrayType } from "./reducers/Todos";
import { Loading } from "./reducers/LoadingSlice";
import { DarkModeType } from "./reducers/DarkModeSlice";
import { ToggleModalType } from "./reducers/ToggleModalSlice";
import { selectedTodoType } from "./reducers/selectedTodoSlice";

export interface RootState {
  Todos: TodosArrayType,
  Loading: Loading,
  DarkMode: DarkModeType,
  ToggleModal: ToggleModalType,
  SelectedTodo: selectedTodoType
}
