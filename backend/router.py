from typing import Annotated

from fastapi import Depends, APIRouter

from schemas import Goal, User

router = APIRouter(
    prefix="",
    tags=["Goals"]
)


@router.get("/goals")
async def get_goals() -> list[Goal]:
    goals = [
        {"id": 0, "name": "lose weight"},
        {"id": 1, "name": "goal 1"},
        {"id": 2, "name": "goal 2"},
        {"id": 3, "name": "goal 3"},
    ]

    return goals


@router.post("/user/register")
async def register_user(user: User):
    return user

