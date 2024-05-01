import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from 'components/Goals/GoalsSlice'

export const store = configureStore({
  reducer: {
    goals: goalsReducer
  },
});
