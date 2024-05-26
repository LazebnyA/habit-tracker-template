import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {deleteHabit, fetchDataForSelectedHabit, trackHabit, untrackHabit} from "./HabitsSlice";
import HabitCalendarModal from "./HabitCalendar/HabitCalendarModal";
import HabitDeleteModal from "./HabitUpdateDelete/HabitDeleteModal";
import HabitEditModal from "./HabitUpdateDelete/HabitEditModal";


const HabitsItem = styled.div`
    display: flex;
    justify-content: space-between;

    ul {
        padding: 0;
        list-style: none;
        width: 100%;

        li {
            display: flex;
            padding: 13px 10px;
            align-items: center;
            justify-content: space-between;
            margin-top: 5px;
            border-radius: 2px;
            transition: 0.3s;
            
            .habitWrapper {
                display: flex;
                align-items: center;
            }
            
            &:hover {
                color: cornflowerblue;
                cursor: pointer;
                background-color: #e3e3e388 !important;
            }

            &:first-child {
                margin-top: 0;
            }

            label {
                transition: 0.3s;
                margin-left: 10px;

                &:hover {
                    color: cornflowerblue;
                    cursor: pointer;
                }
            }

            input[type="checkbox"] {
                height: 25px;
                width: 25px;
                cursor: pointer;
                transition: 0.3s;

                &:hover {
                    border-color: red; /* Change border color on hover */
                    box-shadow: 0 0 5px rgba(0, 0, 255, 0.5); /* Add a box shadow on hover */
                }
            }
        }
    }
    
    .habitOptions {
        display: flex;
    }
`;

const HabitsList = ({ habitsData }) => {

    const dispatch = useDispatch();
    const currentDate = useSelector(state => state.habits.currentDate)
    const selectedHabit = useSelector(state => state.habits.selectedHabit)

    const handleCheckboxClick = (habitID) => {
        dispatch(fetchDataForSelectedHabit({habitID}))
    }

    const handleCheckboxChange = (isChecked, habitID) => {
        if (isChecked) {
            dispatch(trackHabit({ habitID: habitID, date: currentDate}));
        } else {
            dispatch(untrackHabit({ habitID: habitID, date: currentDate}));
        }
    };

     return (
        <HabitsItem>
            <ul>
                {habitsData && habitsData.map((habit, index) => (
                    <li style={selectedHabit && habit.id === selectedHabit.habitID ? {backgroundColor: "#e3e3e388"} : {}} key={`habit-${index}`} onClick={() => handleCheckboxClick(habit.id)}>
                        <div className="habitWrapper">
                            <input
                                id={`habit_name_${index}`}
                                type="checkbox"
                                checked={habit.is_checked}
                                onChange={(e) => handleCheckboxChange(e.target.checked, habit.id)}
                            />
                            <label style={habit.id === selectedHabit ? {color: "cornflowerblue"} : {}}
                                   htmlFor={`habit_name_${index}`}>{habit.name}</label>
                        </div>
                        <div className="habitOptions">
                            <HabitCalendarModal />
                            <HabitDeleteModal habitID={habit.id} />
                            <HabitEditModal habitID={habit.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </HabitsItem>
     );
}

export default HabitsList;