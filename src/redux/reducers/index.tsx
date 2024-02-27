// src/redux/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import Todos from './Todos';
import DarkModeSlice from './DarkModeSlice';
import ToggleModalSlice from './ToggleModalSlice';
import selectedTodoSlice from './selectedTodoSlice';

const rootReducer = combineReducers({
  Todos: Todos,
  DarkMode: DarkModeSlice,
  ToggleModal: ToggleModalSlice,
  SelectedTodo: selectedTodoSlice
});

export default rootReducer;
