import React, { useEffect } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {fetchWeatherData, resetWeather} from "./WeatherSlice";
import ResetWeather from "./ResetWeather";

const WeatherCard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    
    .weatherInfoWrapper {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        img {
            margin-left: 40px;
        }
    }
    
    .cityName {
        font-size: 25px;
    }
`;

const Weather = () => {
    const currentLocation = useSelector(state => state.weather.currentGeo);
    const weatherData = useSelector(state => state.weather.weatherData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentLocation && currentLocation.latitude && currentLocation.longitude) {
            dispatch(fetchWeatherData({
                lat: currentLocation.latitude,
                lon: currentLocation.longitude
            }));
        }
    }, [currentLocation, dispatch]);

    return (
        <>
            {weatherData &&
                <WeatherCard>
                    <div className="weatherInfoWrapper">
                        <div className="temperature">
                            <div className="cityName">{currentLocation["city"]}</div>
                            <div className="weatherMain">{weatherData.weather[0].main}</div>
                            <p>Actual: {weatherData.main["temp"]}°</p>
                            <p>Feels like: {weatherData.main["feels_like"]}°</p>
                        </div>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                             alt={`Icon for ${weatherData.weather[0].main}`}/>
                    </div>
                    <ResetWeather />

                </WeatherCard>}
        </>
    );
}

export default Weather;