// src/redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks[action.payload];
      task.completed = !task.completed;
    },
    editTask: (state, action) => {
      const { index, newText } = action.payload;
      state.tasks[index].text = newText;
    },
  },
});

export const { addTask, deleteTask, toggleComplete, editTask } = todoSlice.actions;
export default todoSlice.reducer;