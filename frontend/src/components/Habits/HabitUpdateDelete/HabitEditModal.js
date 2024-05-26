import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { Modal } from 'react-responsive-modal';
import {useDispatch, useSelector} from "react-redux";
import {addHabit, deleteHabit, fetchDataForSelectedHabit, redactHabit} from "components/Habits/HabitsSlice";
import {getHabit} from "./getHabit";
import 'react-responsive-modal/styles.css';

const InnerEditHabitButton = styled.div`
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
    width: 375px;
`

const ModalTitle = styled.div`
    font-size: 30px;
    margin-bottom: 20px;
`

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    p {
        margin: 10px 0;
    }
    label {
        margin-bottom: 10px;
    }
    input {
        padding: 5px;
        border: 2px solid #e3e3e3;
        &:focus {
            outline: 1px solid cornflowerblue;
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

    :focus {
        outline: none;
        border: none;
    }
`;

const HabitEditModal = ({habitID}) => {

    const [showModal, setShowModal] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState('');

    const [habitName, setHabitName] = useState("")

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const currentDate = useSelector((state) => state.habits.currentDate);
    const goalID = useSelector((state) => state.goals.selectedGoal.id);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchHabit = async () => {
            const habit = await getHabit(habitID);
            setHabitToEdit(habit);
        };

        if (showModal) {
            fetchHabit();
        }
    }, [habitID, showModal]);

    const handleHabitChange = (e) => {
        setHabitName(e.target.value);
     }

    const handleSubmit = () => {
        const payload = {goalID, habitID, currentDate, newHabitName: habitName}
        dispatch(redactHabit(payload))
        closeModal();
    };

    return (
        <>
            <InnerEditHabitButton onClick={openModal}>
                <img src="images/pencil.png" alt="delete-habit-btn" />
            </InnerEditHabitButton>
            <Modal
                open={showModal}
                onClose={closeModal}
                center
                classNames={{ modal: 'custom-modal' }}
            >
                <ModalContentContainer>
                    <ModalTitle>Update Habit</ModalTitle>
                    <InputSection>
                        <p>{`Current habit name: "${habitToEdit.name}".`}</p>
                        <label htmlFor="updateHabit">Enter new Habit Name</label>
                        <input type={"text"} id={"updateHabit"} placeholder={"new Habit Name"}
                               onChange={handleHabitChange} maxLength={50}/>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type="button" onClick={handleSubmit} disabled={habitName.length === 0}>
                            Update Habit
                        </SubmitButton>
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>
        </>
    );
}


export default HabitEditModal;