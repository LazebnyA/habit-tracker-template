import React from "react";
import styled from "styled-components";
import { resetWeather } from "./WeatherSlice";
import { useDispatch } from "react-redux";

const ResetButton = styled.button`
    height: 50%;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 10px 20px !important;
    background-color: lightblue;
    border-radius: 2px;
    cursor: pointer;
    color: #3D5A80;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        color: #e3e3e3;
        background-color: cornflowerblue;
    }
    img {
        margin-left: 20px;
    }
`;

const SetWeatherWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
`;

const ResetWeather = ({ isNull, showForm }) => {
    const dispatch = useDispatch();
    const handleResetWeather = () => {
        console.log("Resetting weather...");
        dispatch(resetWeather());
    };

    return (
        <>
            {!isNull ? (
                <ResetButton onClick={handleResetWeather}>
                    Reset Location
                    <img src={`${process.env.PUBLIC_URL}/images/planet-earth.png`} alt="Planet Earth" width={25} />
                </ResetButton>
            ) : (
                <SetWeatherWrapper>
                    <ResetButton onClick={() => showForm(true)}>
                        Set Location
                        <img src={`${process.env.PUBLIC_URL}/images/planet-earth.png`} alt="Planet Earth" width={25} />
                    </ResetButton>
                </SetWeatherWrapper>
            )}
        </>
    );
};

export default ResetWeather;