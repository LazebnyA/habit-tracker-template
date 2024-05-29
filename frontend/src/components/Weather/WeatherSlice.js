import {createAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

let currentUserlocation = null;
const locationInfoString = localStorage.getItem("location_info");

if (locationInfoString !== null) {
    try {
        currentUserlocation = JSON.parse(locationInfoString);
    } catch (error) {
        console.error("Error parsing location info from localStorage:", error);
    }
}

export const fetchDataForInputLocation = createAsyncThunk("weather/fetchLocation",
    async (cityName, thunkAPI) => {
        const options = {
            method: 'GET',
            url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
            params: { namePrefix: cityName },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_GEO_RAPID_API_KEY,
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            const filteredResponse = response.data.data ? response.data.data.filter(locItem => locItem.city === cityName) : response.data.data;
            localStorage.setItem("location_info", JSON.stringify(filteredResponse[0]));
            return filteredResponse;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchWeatherData = createAsyncThunk("weather/fetchWeather",
    async (payload, thunkAPI) => {
        const { lat, lon } = payload;
        const OPWM_API_KEY = process.env.REACT_APP_OPWM_API_KEY;
        const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPWM_API_KEY}`

        try {
            const response = await axios.get(requestURL);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const resetWeather = createAction("weather/resetWeather")

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        currentGeo: currentUserlocation,
        weatherData: null,
        loading: 'idle',
        error: null
    },
    reducers: {
        resetWeather: (state) => {
            localStorage.setItem("location_info", "");
            state.currentGeo = null;
            state.weatherData = null;
            state.loading = 'idle';
            state.error = null;
        },
    },
    extraReducers: builder =>
        builder
            .addCase(fetchDataForInputLocation.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchDataForInputLocation.fulfilled, (state, action) => {
                state.loading = 'idle';
                if (action.payload) {
                    state.currentGeo = action.payload[0];
                }
            })
            .addCase(fetchDataForInputLocation.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.loading = 'idle';
                state.weatherData = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = 'idle';
                state.error = action.payload;
            })
});

export default weatherSlice.reducer;