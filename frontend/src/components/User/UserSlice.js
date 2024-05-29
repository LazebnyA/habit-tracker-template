import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

const userInfoString = localStorage.getItem("user_info");
const currentUserInfo = userInfoString ? JSON.parse(userInfoString) : null

const initUserState = {
    loggedInUser: currentUserInfo,
    registerState: {loading: "idle", error: null, currentRequestID: undefined},
    signinState: {loading: "idle", error: null, currentRequestID: undefined},
};

export const registerUser = createAsyncThunk("user/register", async (userInfo, thunkAPI) => {

    try {
        const { firstName, lastName, email, password, passwordConfirm } = userInfo;
        const url = `https://evolve-service.onrender.com/user/register?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&passwordConfirm=${encodeURIComponent(passwordConfirm)}`;

        const response = await axios.post(url, '', {
          headers: {
            'accept': 'application/json'
          }
        });
        localStorage.setItem("user_info", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        const {rejectWithValue} = thunkAPI;
        console.log(rejectWithValue(error.response.data));
        return rejectWithValue(error.response.data);
    }
});


export const signinUser = createAsyncThunk("user/signin", async (userInfo, thunkAPI) => {
    const { email, password } = userInfo;

    try {
        const url = `https://evolve-service.onrender.com/user/signin?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

        const response = await axios.post(url, '', {
          headers: {
            'accept': 'application/json'
          }
        });
        localStorage.setItem("user_info", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        const {rejectWithValue} = thunkAPI;
        console.log(rejectWithValue(error.response.data));
        return rejectWithValue(error.response.data);
    }
});


const userSlice = createSlice({
    name: "user",
    initialState: initUserState,
    reducers: {
        logoutUser: (state) => {
            state.loggedInUser = null;
            localStorage.removeItem("user_info");
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state, action) => {
            const {registerState} = state
            registerState.loading = "pending"
            registerState.currentRequestID = action.meta.requestId
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            const {registerState} = state
            registerState.currentRequestID = undefined
            registerState.error = null
            state.loggedInUser = action.payload
          })
          .addCase(registerUser.rejected, (state, action) => {
            const {registerState} = state
            state.loading = 'idle';
            registerState.currentRequestID = undefined
            registerState.error = action.payload
          })
          .addCase(signinUser.pending, (state, action) => {
              const {signinState} = state;
              signinState.loading = "pending"
              signinState.currentRequestID = action.meta.requestId
          })
        .addCase(signinUser.fulfilled, (state, action) => {
              const {signinState} = state;
              signinState.loading = "idle"
              signinState.currentRequestID = undefined
              signinState.error = null
              state.loggedInUser = action.payload
          })
        .addCase(signinUser.rejected, (state, action) => {
              const {signinState} = state;
              signinState.loading = "idle"
              signinState.currentRequestID = undefined
              signinState.error = action.payload
          })
    }
});

export const {logoutUser} = userSlice.actions;
export default userSlice.reducer;