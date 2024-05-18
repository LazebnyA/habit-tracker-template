import React, {useState} from 'react';
import styled from "styled-components";
import { Modal } from 'react-responsive-modal';
import {useDispatch, useSelector} from "react-redux";
import {addHabit} from "./HabitsSlice";


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
    label {
        margin-bottom: 5px;
    }
    input {
        padding: 5px;
        border: 2px solid #e3e3e3;
        :focus {
            outline: 2px solid cornflowerblue;
            border: none;
        }
    }
`;


const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
`;

const SubmitButton = styled.div`
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
`;

const AddHabitButton = () => {
    const goalsState = useSelector(state => state.goals);
    const currentDate = useSelector(state => state.habits.currentDate)
    const {selectedGoal} = goalsState;

     const [showModal, setShowModal] = useState(false);
     const openModal = () => setShowModal(true);
     const closeModal = () => setShowModal(false);

     const [habitName, setHabitName] = useState("")

     const handleHabitChange = (e) => {
        setHabitName(e.target.value);
     }

     const dispatch = useDispatch()
     const handleSubmit = () => {
         const payload = {goalID: selectedGoal.id, habitName: habitName, currentDate: currentDate};
         dispatch(addHabit(payload));
         closeModal();
     }

     return (
        <>

            <InnerAddHabitButton onClick={openModal}>
                <b>+</b> add a habit
            </InnerAddHabitButton>
            <Modal open={showModal} onClose={closeModal} center >
                <ModalContentContainer>
                    <ModalTitle>Create a New Habit</ModalTitle>
                    <InputSection>
                        <label htmlFor="createHabit">Enter a Habit Name</label>
                        <input type={"text"} id={"createHabit"} placeholder={"Habit Name"}
                               onChange={handleHabitChange} maxLength={50}/>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type={"submit"} onClick={handleSubmit}>
                            Add Habit
                        </SubmitButton>
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>

        </>
    )
}

export default AddHabitButton;