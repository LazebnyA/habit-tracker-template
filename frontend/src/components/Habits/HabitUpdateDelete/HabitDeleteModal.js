import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Modal } from 'react-responsive-modal';
import {useDispatch, useSelector} from "react-redux";
import {addHabit, deleteHabit, fetchDataForSelectedHabit} from "components/Habits/HabitsSlice";
import {getHabit} from "./getHabit";
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


const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    label {
        margin-bottom: 10px;
    }
    input {
        padding: 5px;
        border: 1px solid #e3e3e3;
        &:focus {
            outline: 1px solid cornflowerblue;
            border-radius: 3px;
            border: none;
        }
    }
`;


const customModalStyles = `
    .custom-modal .react-responsive-modal-closeButton {
        transition: none;
    }
    .custom-modal .react-responsive-modal-closeButton:hover {
        background-color: transparent !important;
    }
`;



const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
`;

const SubmitButton = styled.div`
    background-color: rgb(160, 0 ,0);
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
`;


const HabitDeleteModal = ({ habitID }) => {
    const [showModal, setShowModal] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState('');

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const currentDate = useSelector((state) => state.habits.currentDate);
    const goalID = useSelector((state) => state.goals.selectedGoal.id);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchHabit = async () => {
            const habit = await getHabit(habitID);
            setHabitToDelete(habit);
        };

        if (showModal) {
            fetchHabit();
        }
    }, [habitID, showModal]);

    const handleDeleteHabit = (habitID) => {
        dispatch(deleteHabit({ goalID, habitID, currentDate }));
    };

    const handleSubmit = () => {
        handleDeleteHabit(habitID);
        closeModal();
    };

    return (
        <>
            <InnerAddHabitButton onClick={openModal}>
                <img src="images/bin.png" alt="delete-habit-btn" />
            </InnerAddHabitButton>
            <Modal
                open={showModal}
                onClose={closeModal}
                center
                classNames={{ modal: 'custom-modal' }}
            >
                <ModalContentContainer>
                    <ModalTitle>Delete Habit</ModalTitle>
                    <InputSection>
                        <label>{`Are you sure you want to delete "${habitToDelete && habitToDelete.name}"?`}</label>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type="button" onClick={handleSubmit}>
                            Delete Habit
                        </SubmitButton>
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>
        </>
    );
};

export default HabitDeleteModal;