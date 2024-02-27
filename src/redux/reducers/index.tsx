// src/redux/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import Todos from './Todos';
import LoadingSlice from './LoadingSlice';
import DarkModeSlice from './DarkModeSlice';

const rootReducer = combineReducers({
  Todos: Todos,
  Loading: LoadingSlice,
  DarkMode: DarkModeSlice
});

export default rootReducer;
