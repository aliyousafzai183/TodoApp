// src/redux/reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import Todos from './Todos';

const rootReducer = combineReducers({
  Todos: Todos
});

export default rootReducer;
