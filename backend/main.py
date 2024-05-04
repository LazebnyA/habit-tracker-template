from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import router as goals_router


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://192.168.1.3:3000",
    "http://192.168.1.4:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(goals_router)
