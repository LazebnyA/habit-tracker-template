import React, {useState} from 'react';
import styled from "styled-components";
import { Modal } from 'react-responsive-modal';
import {useDispatch, useSelector} from "react-redux";
import {deleteGoal} from "../GoalsSlice";
import 'react-responsive-modal/styles.css';


const InnerDeleteGoalButton = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
        max-width: 25px;
    }
`

const ModalContentContainer = styled.form`
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


const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
`;

const SubmitButton = styled.button`
    background-color: #790505;
    border: none;
    border-radius: 2px;
    padding: 8px 10px 8px 10px;
    color: white;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;

    &:hover {
        background-color: #570505;
    }

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



const DeleteGoalButton = (props) => {
    const userState = useSelector(state => state.user);
    const {loggedInUser} = userState;

     const [showModal, setShowModal] = useState(false);
     const openModal = () => setShowModal(true);
     const closeModal = () => setShowModal(false);

     const dispatch = useDispatch()
     const handleSubmit = (e) => {
         e.preventDefault();
         const payload = {email: loggedInUser.email, goalName: props.goalName, goalID: props.goalID};
         dispatch(deleteGoal(payload));
     }

     return (
        <>

            <InnerDeleteGoalButton onClick={openModal}>
                <img src="images/delete.png" alt="add-goal-btn"/>
            </InnerDeleteGoalButton>
            <Modal
                open={showModal}
                onClose={closeModal}
                center
                classNames={{ modal: 'custom-modal' }}
            >
                <ModalContentContainer>
                    <ModalTitle>Delete Goal</ModalTitle>
                    <InputSection>
                        <label>{`Are you sure you want to delete "${props.goalName}"?`}</label>
                    </InputSection>
                    <ButtonContainer>
                        <SubmitButton type={"submit"} onClick={handleSubmit}>
                            Delete Goal
                        </SubmitButton>
                    </ButtonContainer>
                </ModalContentContainer>
            </Modal>

        </>
    )
}

export default DeleteGoalButton;