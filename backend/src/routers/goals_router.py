from fastapi import Depends, APIRouter, HTTPException

from src.repository import GoalRepository
from src.schemas import GoalOrmScheme, UserEmail, GoalID, GoalDatabaseModel

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)


@router.get("/get", response_model=list[GoalDatabaseModel])
async def get_goals(
        user: UserEmail = Depends()
):
    goals_list = await GoalRepository.get_goals(user)
    return goals_list


@router.post("/create")
async def add_goal(
        user: UserEmail = Depends(),
        goal: GoalOrmScheme = Depends()
):
    goal_to_add = await GoalRepository.add_goal(user, goal)
    return goal_to_add


@router.put("/update")
async def update_goal(
        goal_id: GoalID = Depends(),
        new_goal_name: GoalOrmScheme = Depends()
):
    try:
        response = await GoalRepository.update_goal(goal_id, new_goal_name)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete")
async def delete_goal(goal_id: GoalID = Depends()):
    try:
        response = await GoalRepository.delete_goal(goal_id)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))