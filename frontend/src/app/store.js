import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from 'components/Goals/GoalsSlice'
import userReducer from 'components/User/UserSlice';
import habitsReducer from 'components/Habits/HabitsSlice';

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    habits: habitsReducer,
    user: userReducer
  },
});
