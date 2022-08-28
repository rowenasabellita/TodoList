from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from datetime import date
 
    
class TodoSchema(BaseModel):
    id : Optional[int]
    title : str
    date_added : date
    date_completed : Optional[date]
    
    class Config:
        orm_mode = True
    
class SaveTodo(BaseModel):
    id : Optional[int]
    title : str
    date_added : date
    
    class Config:
        orm_mode = True
        
class DateCompleted(BaseModel):
    date_completed : date
    
    class Config:
        orm_mode = True