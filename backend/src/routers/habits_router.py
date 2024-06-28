from datetime import datetime
from typing import Annotated

from fastapi import Depends, APIRouter

from src.repository import HabitsRepository, HabitTrackRepository
from src.schemas import GoalID, HabitName

router = APIRouter(
    prefix="/habits",
    tags=["Habits"]
)


@router.get("/get")
async def get_habits(goal_id: Annotated[GoalID, Depends()]):
    habits_list = await HabitsRepository.get_habits(goal_id)
    return habits_list

@router.get("/get/{habit_id}")
async def get_habit(habit_id: int):
    habits_list = await HabitsRepository.get_habit(habit_id)
    return habits_list

@router.post("/create")
async def add_habit(goal_id: Annotated[GoalID, Depends()], habit_name: Annotated[HabitName, Depends()]):
    habit_to_add = await HabitsRepository.add_habit(goal_id, habit_name.name)
    return habit_to_add


@router.put("/update/{habit_id}&{new_habit_name}")
async def update_habit(habit_id: int, new_habit_name: str):
    response = await HabitsRepository.update_habit(habit_id, new_habit_name)
    return response


@router.delete("/delete/{habit_id}")
async def delete_habit(habit_id: int):
    response = await HabitsRepository.delete_habit(habit_id)
    return response


@router.post("/track/{habit_id}&{date}")
async def track_habit(habit_id: int, date: str):
    parsed_date = date[:10]
    response = await HabitTrackRepository.track_habit(habit_id, parsed_date)

    return response


@router.put("/untrack/{habit_id}&{date}")
async def untrack_habit(habit_id: int, date: str):
    parsed_date = date[:10]
    response = await HabitTrackRepository.untrack_habit(habit_id, parsed_date)

    return response


@router.get("/trackInfo/{goal_id}&{date}")
async def get_trackInfo(goal_id: int, date: str):
    parsed_date = date[:10]
    response = await HabitTrackRepository.get_habits_by_date(goal_id, parsed_date)

    return response


@router.get("/trackDateInfo/{habit_id}")
async def get_trackInfo(habit_id: int):
    response = await HabitTrackRepository.get_dates_by_habit(habit_id)

    return response
