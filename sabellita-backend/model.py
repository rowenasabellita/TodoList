from fastapi import FastAPI
from pony.orm import *
from datetime import date

db = Database()
db.bind(provider='mysql', host='localhost', user='root', passwd='', db='sabellita_db')


class TodoList(db.Entity):
    id = PrimaryKey(int, auto=True)
    title = Required(str)
    date_added = Required(date)
    date_completed = Optional(date)
    
db.generate_mapping(create_tables=True)
pony.orm.sql_debug(True)

