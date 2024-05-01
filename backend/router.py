from typing import Annotated

from fastapi import Depends, APIRouter

from schemas import Goal

router = APIRouter(
    prefix="/goals",
    tags=["Goals"]
)


@router.get("/")
async def get_goals() -> list[Goal]:
    goals = [
        {"id": 0, "name": "lose weight"},
        {"id": 1, "name": "goal 1"},
        {"id": 2, "name": "goal 2"},
        {"id": 3, "name": "goal 3"},
    ]

    return goals
