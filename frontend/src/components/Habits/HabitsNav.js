import React from "react";
import { ReactComponent as LeftArrow } from './left-arrow.svg';
import { ReactComponent as RightArrow } from './right-arrow.svg';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDate} from "./HabitsSlice";

const NavContainer = styled.div`
    display: flex;
    margin: auto 0;
    * {
        cursor: pointer;
        width: 100%;
        height: 30px;
        &:first-child {
            margin-right: 10px;
        }
    }
`

const HabitsNav = () => {
    const dispatch = useDispatch();
    const currentDate = useSelector(state => state.habits.currentDate);

    const handlePrevDay = () => {
        const currentDateObject = new Date(currentDate);
        const prevDate = new Date(currentDateObject.setDate(currentDateObject.getDate() - 1)).toISOString();
        dispatch(setCurrentDate(prevDate));
    }

    const handleNextDay = () => {
        const currentDateObject = new Date(currentDate);
        const nextDate = new Date(currentDateObject.setDate(currentDateObject.getDate() + 1)).toISOString();
        dispatch(setCurrentDate(nextDate));
    }

    return (
        <NavContainer>
            <LeftArrow onClick={handlePrevDay}/>
            <RightArrow onClick={handleNextDay}/>
        </NavContainer>
    )
}

export default HabitsNav;