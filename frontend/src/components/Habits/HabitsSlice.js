import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHabitsByGoal = createAsyncThunk(
  'habits/fetchByGoal',
  async (payload, thunkAPI) => {
    try {
      const {selectedGoalID, selectedDate} = payload;
      const habitsResponse = await axios.get(`http://127.0.0.1:8000/habits/get?id=${selectedGoalID}`, {
              headers: {
                'accept': 'application/json'
              }
            });

      const checkedHabits = await axios.get(`http://127.0.0.1:8000/habits/trackInfo/${selectedGoalID}&${selectedDate}`, {
              headers: {
                'accept': 'application/json'
              }
            });

      return habitsResponse.data.map(habit => {
          const isChecked = checkedHabits.data.some(checkedHabitID => checkedHabitID === habit.id);
          return {...habit, is_checked: isChecked};
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addHabit = createAsyncThunk(
  'habits/addHabit',
  async (payload, thunkAPI) => {
    try {
      const {goalID, habitName, currentDate} = payload;
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/habits/create?id=${goalID}&name=${habitName}`,{
              headers: {
                'accept': 'application/json'
              }
            });

      const {dispatch} = thunkAPI;
      dispatch(fetchHabitsByGoal({selectedGoalID: goalID, selectedDate: currentDate}));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteHabit = createAsyncThunk('habits/deleteHabit',
    async(payload, thunkAPI) => {
        try {
          const {goalID, habitID, currentDate} = payload;
          const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/habits/delete/${habitID}`,{
                  headers: {
                    'accept': 'application/json'
                  }
                });

          const {dispatch} = thunkAPI;
          dispatch(fetchHabitsByGoal({selectedGoalID: goalID, selectedDate: currentDate}));

          return response.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const redactHabit = createAsyncThunk('habits/redactHabit',
    async(payload, thunkAPI) => {
        try {
          const {goalID, habitID, currentDate, newHabitName} = payload;
          const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/habits/update/${habitID}&${newHabitName}`,{
                  headers: {
                    'accept': 'application/json'
                  }
                });

          const {dispatch} = thunkAPI;
          dispatch(fetchHabitsByGoal({selectedGoalID: goalID, selectedDate: currentDate}));

          return response.data;
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const trackHabit = createAsyncThunk(
  'habits/trackHabit',
  async ({ habitID, date }, thunkAPI) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/habits/track/${habitID}&${date}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const untrackHabit = createAsyncThunk(
  'habits/untrackHabit',
  async ({ habitID, date }, thunkAPI) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/habits/untrack/${habitID}&${date}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setCurrentDate = createAction('habits/setCurrentDate');
export const fetchDataForSelectedHabit = createAsyncThunk("habits/fetchDates",
    async ({habitID}, thunkAPI) => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/habits/trackDateInfo/${habitID}`);
          return {habitID: habitID, habitDates: response.data};
        } catch (error) {
          return thunkAPI.rejectWithValue(error.response.data);
        }
    })

const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
      habitsList: [],
      selectedHabit: null,
      currentDate: new Date().toISOString(),
      loading: 'idle',
      error: null
  },
  reducers: {
    setCurrentDate: (state, action) => {
        state.currentDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitsByGoal.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchHabitsByGoal.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.habitsList = action.payload;
      })
      .addCase(fetchHabitsByGoal.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(trackHabit.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(trackHabit.fulfilled, (state, action) => {
        state.loading = 'idle';
        const { habitID } = action.payload;
        state.habitsList = state.habitsList.map((habit) => {
          if (habit.id === habitID) {
            return { ...habit, is_checked: true };
          }
          return habit;
        });
      })
      .addCase(trackHabit.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(untrackHabit.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(untrackHabit.fulfilled, (state, action) => {
        state.loading = 'idle';
        const { habitID } = action.payload;
        state.habitsList = state.habitsList.map((habit) => {
          if (habit.id === habitID) {
            return { ...habit, is_checked: false };
          }
          return habit;
        });
      })
      .addCase(untrackHabit.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })
      .addCase(fetchDataForSelectedHabit.pending,(state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDataForSelectedHabit.fulfilled,(state, action) => {
          state.loading = 'idle';
          state.selectedHabit = action.payload;
      })
      .addCase(fetchDataForSelectedHabit.rejected,(state, action) => {
        state.loading = 'idle';
        state.error = action.payload;
      })

  }
});

export default habitsSlice.reducer;