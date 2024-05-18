from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.habits_router import router as habits_router
from routers.goals_router import router as goals_router
from routers.user_router import router as user_router

app = FastAPI()

origins = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://localhost:3002",
    "http://192.168.1.3:3000",
    "http://192.168.1.4:3000",
    "http://192.168.1.4:3002",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(goals_router)
app.include_router(user_router)
app.include_router(habits_router)
