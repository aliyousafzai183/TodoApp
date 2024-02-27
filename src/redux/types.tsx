// src/redux/types.ts
import { TodosType } from "./reducers/Todos";
import { Loading } from "./reducers/LoadingSlice";
import { DarkModeType } from "./reducers/DarkModeSlice";

export interface RootState {
  TodosType: TodosType,
  Loading: Loading,
  DarkMode: DarkModeType
}
