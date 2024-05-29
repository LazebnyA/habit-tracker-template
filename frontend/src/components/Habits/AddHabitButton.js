import React, { useState } from 'react';
import styled from "styled-components";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { addHabit } from "./HabitsSlice";

const InnerAddHabitButton = styled.div`
    margin: auto 0;
    width: 50%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    border: none;
    background-color: lightblue;
    padding: 5px 12px;
    border-radius: 2px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        color: #e3e3e3;
        background-color: cornflowerblue;
    }
    b {
        font-size: 25px;
        margin-right: 12px;
    }
`;

const ModalContentContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 375px;
`;

const ModalTitle = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
`;

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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
`;

const SubmitButton = styled.button`
    background-color: cornflowerblue;
    border: none;
    border-radius: 2px;
    padding: 8px 10px 8px 10px;
    color: white;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    opacity: ${(props) => (props.disabled ? 0.7 : 1)};
    pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

    &:focus {
        outline: none;
        border: none;
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

const AddHabitButton = () => {
    const goalsState = useSelector(state => state.goals);
    const currentDate = useSelector(state => state.habits.currentDate);
    const { selectedGoal } = goalsState;

    const [showModal, setShowModal] = useState(false);
    const [habitName, setHabitName] = useState("");

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleHabitChange = (e) => {
        setHabitName(e.target.value);
    };

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { goalID: selectedGoal.id, habitName: habitName, currentDate: currentDate };
        dispatch(addHabit(payload));
        closeModal();
    };

    return (
        <>
            <style>{customModalStyles}</style>
            <InnerAddHabitButton onClick={openModal}>
                <b>+</b> add a habit
            </InnerAddHabitButton>
            <Modal
                open={showModal}
                onClose={closeModal}
                center
                classNames={{ modal: 'custom-modal' }}
            >
                <ModalContentContainer>
                    <ModalTitle>Create a New Habit</ModalTitle>
                    <InputSection>
                        <label htmlFor="createHabit">Enter a Habit Name</label>
                        <input
                            type="text"
                            id="createHabit"
                            placeholder="Habit Name"
                            onChange={handleHabitChange}
                            maxLength={50}
                        />
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type="submit" onClick={handleSubmit} disabled={habitName.length === 0}>
                            Add Habit
                        </SubmitButton>
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>
        </>
    );
};

export default AddHabitButton;