from typing import Annotated, List

from fastapi import Depends, APIRouter

from src.repository import UserRepository, GoalRepository
from src.schemas import Goal, UserRegScheme, UserSignInScheme, UserOrmScheme, GoalOrmScheme, UserEmail, GoalID

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)

@router.get("/get")
async def get_goals(user: Annotated[UserEmail, Depends()]):
    goals_list = await GoalRepository.get_goals(user)
    return goals_list


@router.post("/create")
async def add_goal(user: Annotated[UserEmail, Depends()], goal: Annotated[GoalOrmScheme, Depends()]):
    goal_to_add = await GoalRepository.add_goal(user, goal)
    return goal_to_add


@router.put("/update")
async def update_goal(goalID: Annotated[GoalID, Depends()],
                      newGoalName: Annotated[GoalOrmScheme, Depends()]):
    response = await GoalRepository.update_goal(goalID, newGoalName)
    return response

@router.delete("/delete")
async def delete_goal(goalID: Annotated[GoalID, Depends()]):
    response = await GoalRepository.delete_goal(goalID)
    return response
