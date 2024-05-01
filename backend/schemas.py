from typing import Optional
from pydantic import BaseModel


class Goal(BaseModel):
    id: int
    name: str
