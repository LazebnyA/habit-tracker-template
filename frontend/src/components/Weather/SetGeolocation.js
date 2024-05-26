import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {fetchDataForInputLocation} from "./WeatherSlice";
import ResetWeather from "./ResetWeather";

const GeoWrapper = styled.div`
    display: flex;
`

const GeoForm = styled.form`
    .geoInput {
        display: flex;
        margin-top: 10px;
        margin-bottom: 10px;
        #geoCity {
            padding: 5px;
            margin-right: 20px;
            border: 2px solid #e3e3e3;
        }
        .submitForm {
            background-color: cornflowerblue;
            border: none;
            border-radius: 2px;
            padding: 8px 10px 8px 10px;
            color: white;
            font-family: inherit;
            font-size: inherit;
            :focus {
                outline: none;
                border: none;
            }
            cursor: pointer;
        }
    }
    .dontShowThis {
        display: inline;
        cursor: pointer;
        color: rgba(255,8,0,0.6);
    }
`

const SetGeolocation = () => {
    const currentLocation = useSelector(state => state.weather.currentGeo)
    const [inputLocation, setInputLocation] = useState("")
    const [showWeather, setShowWeather] = useState(true)

    const handleOnChange = (e) => {
        setInputLocation(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };

    const dispatch = useDispatch();
    const handleSubmit = () => {
        dispatch(fetchDataForInputLocation(inputLocation))
    }

    return (
        <GeoWrapper>
            {showWeather ? !currentLocation && (
                <GeoForm onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="geoCity">
                        If you want to see the weather information, please, enter your city.
                    </label>
                    <div className="geoInput">
                        <input
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your City"
                            onChange={handleOnChange}
                            id="geoCity"
                            type="text"
                        />
                        <div className="submitForm" onClick={handleSubmit}>
                            Submit
                        </div>
                    </div>
                    <div onClick={() => setShowWeather(false)} className="dontShowThis">Don't show this message</div>
                </GeoForm>
            ) : <ResetWeather isNull={true} showForm={setShowWeather}/>}
        </GeoWrapper>
    );
}

export default SetGeolocation;