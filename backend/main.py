from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles

from routers.habits_router import router as habits_router
from routers.goals_router import router as goals_router
from routers.user_router import router as user_router
from routers.news_router import router as news_router

app = FastAPI()

origins = [
    "https://habit-tracker-template.onrender.com",
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
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}


app.include_router(goals_router)
app.include_router(user_router)
app.include_router(habits_router)
app.include_router(news_router)
