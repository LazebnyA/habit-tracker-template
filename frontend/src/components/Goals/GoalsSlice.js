import axios from "axios";
import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const baseUrl = "https://evolve-service.onrender.com";

export const getGoals = createAsyncThunk("goals/get", async (userInfo, thunkAPI) => {
    // call the api for get /goals

    try {
        const { email } = userInfo;
        const url = `${baseUrl}/goals/get?email=${encodeURIComponent(email)}`;

        const response = await axios.get(url, {
          headers: {
            'accept': 'application/json'
          }
        });
        return response.data;
    } catch (error) {
        const {rejectWithValue} = thunkAPI;
        return rejectWithValue(error.response.data);
    }


});

export const createGoal = createAsyncThunk("goals/create", async (payload, thunkAPI) => {
    // call the api for get /goals

    try {
        const { email, goalName, goalID } = payload;
        console.log(goalID);
        let response;

        if (!goalID) {
            const url = `${baseUrl}/goals/create?email=${encodeURIComponent(email)}&name=${encodeURIComponent(goalName)}`;

            response = await axios.post(url, '', {
              headers: {
                'accept': 'application/json'
              }
            });
        } else {
            const url = `${baseUrl}/goals/update?id=${encodeURIComponent(goalID)}&name=${encodeURIComponent(goalName)}`;

            response = await axios.put(url, '', {
              headers: {
                'accept': 'application/json'
              }
            });
        }

        const {dispatch} = thunkAPI;
        dispatch(getGoals(payload));

        return response.data;
    } catch (error) {
        const {rejectWithValue} = thunkAPI;
        return rejectWithValue(error.response.data);
    }


});

export const deleteGoal = createAsyncThunk("goals/delete", async (payload, thunkAPI) => {
    try {
        const { goalID } = payload;

        const url = `${baseUrl}/goals/delete?id=${encodeURIComponent(goalID)}`;
        const response = await axios.delete(url, {
            headers: {
                'accept': 'application/json'
            }
        });

        const {dispatch} = thunkAPI;
        dispatch(getGoals(payload));

        return response.data;

    } catch (error) {
        const {rejectWithValue} = thunkAPI;
        return rejectWithValue(error.response.data);
    }
});


const initGoalsState = {
    goalsList: [],
    loading: "idle",
    error: null
}

const initSelectedGoalState = {
    selectedGoal: null
}

const goalsSlice = createSlice({
    name: 'goals',
    initialState: {...initGoalsState, ...initSelectedGoalState},
    reducers: {
        setSelectedGoal: (state, action) => {
            state.selectedGoal = action.payload;
        },
        setHabitsData: (state, action) => {
            state.habitsData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGoals.pending, (state) => {
                if (state.loading === "idle") {
                    state.loading = "pending";
                }
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.goalsList = action.payload;
                }
            })
            .addCase(getGoals.rejected, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.error = action.payload;
                }
            })
            .addCase(createGoal.pending, (state) => {
                if (state.loading === "idle") {
                    state.loading = "pending";
                }
            })
            .addCase(deleteGoal.pending, (state) => {
                if (state.loading === "idle") {
                    state.loading = "pending";
                }
            })
            .addCase(deleteGoal.fulfilled, (state) => {
                if (state.loading === "pending") {
                    state.selectedGoal = null;
                }
            })
            .addCase(createGoal.rejected, (state, action) => {
                if (state.loading === "pending") {
                    state.loading = "idle";
                    state.error = action.payload;
                }
            })
    }
});

export const { setSelectedGoal} = goalsSlice.actions;
export default goalsSlice.reducer;