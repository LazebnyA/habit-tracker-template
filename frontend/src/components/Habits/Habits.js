import React, {useEffect} from "react";
import styled from "styled-components";
import HabitsList from "./HabitsList";
import {useDispatch, useSelector} from "react-redux";
import {fetchHabitsByGoal} from "./HabitsSlice";
import AddHabitButton from "./AddHabitButton";
import HabitsNav from "./HabitsNav";

const HabitsContainer = styled.div`
    height: 100%;
    display: flex;
    padding-top: 50px;
    flex-direction: column;
`;

const HabitsHeader = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
`

const DateContainer = styled.div`
    display: flex;
    width: 260px;
    justify-content: space-between;
    padding: 10px;
`;

const DayName = styled.div`
    font-size: 30px;
`;

const DateLabel = styled.div`
    margin-top: 5px;
    font-size: 14px;
`

const HabitsBody = styled.div`
    max-height: 60vh;
    overflow-y: auto;
`

const DateInfo = styled.div`
    
`


const Habits = () => {
    const selectedGoal = useSelector(state => state.goals.selectedGoal);
    const habitsData = useSelector(state => state.habits.habitsList);
    const habitsDate = useSelector(state => state.habits.currentDate);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedGoal) {
            dispatch(fetchHabitsByGoal(
                {
                    selectedGoalID: selectedGoal.id,
                    selectedDate: habitsDate
                }
            ));
        }
    }, [selectedGoal, habitsDate, dispatch])


    const currentDate = new Date(habitsDate);

    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = currentDate.toLocaleDateString('en-US');

    return (
        selectedGoal &&
        <HabitsContainer>
            <HabitsHeader>
                <DateContainer>
                    <DateInfo>
                        <DayName>{dayOfWeek}</DayName>
                        <DateLabel>{dateString}</DateLabel>
                    </DateInfo>
                    <HabitsNav />
                </DateContainer>
               <AddHabitButton/>
            </HabitsHeader>
            <HabitsBody>
               <HabitsList habitsData={habitsData}/>
            </HabitsBody>
        </HabitsContainer>
    );
}

export default Habits;