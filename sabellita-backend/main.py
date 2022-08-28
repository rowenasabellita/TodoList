from email.policy import HTTP
from fastapi import FastAPI, Response, status, APIRouter
from model import db, TodoList
from todo_schema import TodoSchema, SaveTodo, DateCompleted
from pony.orm import *

api = APIRouter(tags=['todo'])

@api.get("/")
async def root():
    return {"message": "Hello World"}

@api.post("/add_todo_list", status_code=status.HTTP_201_CREATED)
async def add_todo_list(todo: TodoSchema, response: Response):
    try:
        with db_session:
            new_todo = TodoList(title=todo.title, date_added=todo.date_added)
            commit()
            
        result = SaveTodo.from_orm(new_todo)
        return result
    except TransactionIntegrityError:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"message": "Already exist"}
    
@api.get("/get_todo_list", status_code=status.HTTP_200_OK)
async def get_todo_list():
    with db_session:
        todo = TodoList.select()
        
        result = [TodoSchema.from_orm(i) for i in todo]
    return result     

@api.put("/{id}/edit_date_completed", status_code=status.HTTP_200_OK)
async def edit_date_completed(id: str, todo: DateCompleted):
    with db_session:
        update_todo = TodoList[id]     
        update_todo.set(date_completed=todo.date_completed)       
        commit()
    result = TodoSchema.from_orm(update_todo)
    return result

@api.get("/get_finished_todo_list", status_code=status.HTTP_200_OK)
async def get_finished_todo_list():
    with db_session:
        todo = TodoList.select(lambda t: t.date_completed != None)
        
        result = [TodoSchema.from_orm(i) for i in todo]
    return result

@api.get("/get_unfinished_todo_list", status_code=status.HTTP_200_OK)
async def get_unfinished_todo_list():
    with db_session:
        todo = TodoList.select(lambda t: t.date_completed == None)
        
        result = [TodoSchema.from_orm(i) for i in todo]
    return result
        
        