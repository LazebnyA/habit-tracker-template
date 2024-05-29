import React, {useEffect} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from "react-redux";
import {getGoals, setSelectedGoal} from './GoalsSlice';
import AddGoalButton from "./AddGoalButton";
import UpdateGoalButton from "./UpdateGoalButton";
import DeleteGoalButton from "./DeleteGoalButton";

const GoalsContainer = styled.div`
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
`
const GoalsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 45px;
`
const TitleSection = styled.div`
    text-transform: uppercase;
    letter-spacing: 8px;
    font-size: 30px;
`



const GoalRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 45px;
    :last-child {
        margin-bottom: 0;
    }
`

const GoalsList = styled.div`
    max-height: 60vh;
    overflow-y: auto;
`

const Name = styled.div`
    text-transform: uppercase;
    cursor: pointer;
`

const Action = styled.div`
    display: flex;
    align-items: center;
    
    img {
        max-width: 20px;
        margin-right: 8px;
    }
`

const Goals = () => {
    const dispatch = useDispatch()

    const goalState = useSelector(state => state.goals);
    const {goalsList, selectedGoal, loading, error} = goalState;

    const userState = useSelector(state => state.user);
    const {loggedInUser} = userState;

    useEffect(() => {
        if (loggedInUser) {
            dispatch(getGoals(loggedInUser))
        }
    }, [loggedInUser, dispatch])

    const handleGoalClick = (goal) => {
        dispatch(setSelectedGoal(goal));
    };

    return (
        <GoalsContainer>

            {error && <div>Error fetching goals</div>}
            {loading === "pending" ? (<div>Loading...</div>) : (
                <>
                    <GoalsHeader>
                        <TitleSection>goals</TitleSection>
                        <AddGoalButton />
                    </GoalsHeader>
                    <GoalsList>
                        {goalsList && [...goalsList].sort((a, b) => a.id - b.id).map((goal, index) => (
                            <GoalRow key={`goal-number-${index}`}>
                                {selectedGoal && selectedGoal.id === goal.id ?
                                    <Name style={{color: "cornflowerblue", transition: "0.3s"}} onClick={() => handleGoalClick(goal)}>{goal.name}</Name> :
                                    <Name onClick={() => handleGoalClick(goal)}>{goal.name}</Name>
                                }
                                <Action>
                                    <UpdateGoalButton goalID={goal.id}/>
                                    <DeleteGoalButton goalID={goal.id} goalName={goal.name}/>
                                </Action>
                            </GoalRow>
                        ))}
                    </GoalsList>
                </>
            )}
        </GoalsContainer>
    );
}

export default Goals;