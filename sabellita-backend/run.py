from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import main

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

api.include_router(main.api, prefix="/todo")
