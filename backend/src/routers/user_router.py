from typing import Annotated

from fastapi import Depends, APIRouter

from src.repository import UserRepository
from src.schemas import Goal, UserRegScheme, UserSignInScheme

router = APIRouter(
    prefix="",
    tags=["User"]
)


@router.post("/user/register")
async def register_user(user: Annotated[UserRegScheme, Depends()]):
    user_reg = await UserRepository.add_user(user)
    return user_reg


@router.post("/user/signin")
async def signin_user(user: Annotated[UserSignInScheme, Depends()]):
    user_data = await UserRepository.verify_account(user)
    return user_data
