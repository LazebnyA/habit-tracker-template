import React, {useState} from 'react';
import styled from "styled-components";
import { Modal } from 'react-responsive-modal';
import {createGoal} from 'components/Goals/GoalsSlice';
import {useDispatch, useSelector} from "react-redux";


const InnerAddGoalButton = styled.div`
    text-transform: uppercase;
    display: flex;
    align-items: center;
    padding: 3px 12px;
    border-radius: 2px;
    background-color: lightblue;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
    b {
        font-size: 25px;
        margin-right: 12px;
    }
    &:hover {
        color: #e3e3e3;
        background-color: cornflowerblue;
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
            outline: 2px solid cornflowerblue;;
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
    background-color: cornflowerblue;;
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

const AddGoalButton = () => {
    const userState = useSelector(state => state.user);
    const {loggedInUser} = userState;

     const [showModal, setShowModal] = useState(false);
     const openModal = () => setShowModal(true);
     const closeModal = () => setShowModal(false);

     const [goalName, setGoalName] = useState("")

     const handleGoalChange = (e) => {
        setGoalName(e.target.value);
     }

     const dispatch = useDispatch()
     const handleSubmit = () => {
         const payload = {email: loggedInUser.email, goalName}
         dispatch(createGoal(payload))
     }

     return (
        <>

            <InnerAddGoalButton onClick={openModal}>
                <b>+</b>    add a goal
            </InnerAddGoalButton>
            <Modal open={showModal} onClose={closeModal} center >
                <ModalContentContainer>
                    <ModalTitle>Create a New Goal</ModalTitle>
                    <InputSection>
                        <label htmlFor="createGoal">Enter a Goal Name</label>
                        <input type={"text"} id={"createGoal"} placeholder={"Goal Name"}
                               onChange={handleGoalChange} maxLength={50}/>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type={"submit"} onClick={handleSubmit}>
                            Add Goal
                        </SubmitButton>
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>

        </>
    )
}

export default AddGoalButton;