// src/redux/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import Todos from './Todos';
import LoadingSlice from './LoadingSlice';
import DarkModeSlice from './DarkModeSlice';
import ToggleModalSlice from './ToggleModalSlice';
import selectedTodoSlice from './selectedTodoSlice';

const rootReducer = combineReducers({
  Todos: Todos,
  Loading: LoadingSlice,
  DarkMode: DarkModeSlice,
  ToggleModal: ToggleModalSlice,
  SelectedTodo: selectedTodoSlice
});

export default rootReducer;
