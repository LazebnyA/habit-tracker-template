import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from 'components/Goals/GoalsSlice'
import userReducer from 'components/User/UserSlice';

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    user: userReducer
  },
});
