import React, {useEffect, useState} from 'react';
import './styles/CalendarModal.css';
import styled from "styled-components";
import { Modal } from 'react-responsive-modal';
import {useDispatch, useSelector} from "react-redux";
import {addHabit, deleteHabit, fetchDataForSelectedHabit} from "components/Habits/HabitsSlice";
import HabitCalendar from "./HabitCalendar";
import 'react-responsive-modal/styles.css';

const InnerAddHabitButton = styled.div`
    margin: auto 0;
    
    text-transform: uppercase;
    display: flex;
    align-items: center;
    padding: 3px 12px;
    border-radius: 2px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    img {
        width: 25px;
        height: 25px;
        margin-right: 20px;
        &:last-child {
            margin: 0;
            width: 20px;
            height: 20px;
        }
    }
`

const ModalContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ModalTitle = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
`

const CalendarSection = styled.div`
    padding: 15px 0;
`

const customModalStyles = `
    .custom-modal .react-responsive-modal-closeButton {
        transition: none;
    }
    .custom-modal .react-responsive-modal-closeButton:hover {
        background-color: transparent !important;
    }
`;


const HabitCalendarModal = ({habitID}) => {

     const [showModal, setShowModal] = useState(false);
     const openModal = () => setShowModal(true);
     const closeModal = () => setShowModal(false);

     const currentDate = useSelector(state => state.habits.currentDate)
     let selectedHabit = useSelector(state => state.habits.selectedHabit)
     const goalID = useSelector(state => state.goals.selectedGoal.id)

     const dispatch = useDispatch();

    const handleDeleteHabit = (habitID) => {
        dispatch(deleteHabit({ goalID, habitID, currentDate }));
    }

    const handleRedactHabit = (habitID) => {
        console.log("asdfslkdfjklsdf")
    }

    return (

         <>

             <InnerAddHabitButton>
                 <img onClick={openModal} src="images/calendar.png" alt="calendar-habit-btn"/>
             </InnerAddHabitButton>
             <Modal
                open={showModal}
                onClose={closeModal}
                center
                classNames={{ modal: 'custom-modal' }}
            >
                 <ModalContentContainer>
                    <ModalTitle>Calendar</ModalTitle>
                    <CalendarSection>
                        <HabitCalendar trackedDates={selectedHabit ? selectedHabit.habitDates : []} />
                    </CalendarSection>
                </ModalContentContainer>
            </Modal>

        </>
      );
}


export default HabitCalendarModal;