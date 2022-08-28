import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';  
import { Table } from "react-bootstrap";
import {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function timeout(delay) {
    return new Promise( res =>
      setTimeout(res, delay));
  }


const Todo = () => {
    
    const today = new Date();
    const dateToday =
    today.getFullYear() +
    "-" +
    ("0" + parseInt(today.getMonth() + 1)).slice(-2) +
    "-" + 
    ("0" + today.getDate()).slice(-2);
    
    const [title, setTitle] = useState();
    const [todos, setTodos] = useState([]);
    const [finished, setFinished] = useState([]);
    

    useEffect(() => {
        const {get} = axios.get("http://127.0.0.1:8000/todo/get_unfinished_todo_list")
        .then((res) => {
            setTodos(res.data)
        })

        const {unfinished} = axios.get("http://127.0.0.1:8000/todo/get_finished_todo_list")
        .then((res) => {
            setFinished(res.data)
        })

    },[])


    const handlePost = async(e) => {
        e.preventDefault()
        
        const post = await axios.post("http://127.0.0.1:8000/todo/add_todo_list", {
            title: title,
            date_added: dateToday
        })
        await timeout(500);
        window.location.reload(false);
    }

    const handleChecked = async(e) => {
        if(e.target.checked){
            console.log(e.target.value)
            const edit = await axios.put(`http://127.0.0.1:8000/todo/${e.target.value}/edit_date_completed`, {
                date_completed: dateToday
            })
        }
        await timeout(500);
        window.location.reload(false);
    }



      return (
        <div className="App">
            <div className='container'>
                <form onSubmit={handlePost}>
                <table className='content'>
                        <tr>
                            <td>
                                <label className='todo_title'> To do 
                                    <div className="form" >
                                        <br/>
                                            <div className='title_input'>
                                                <input className="title" type="text" name="title" placeholder="Todo text here" onChange={(e) => setTitle(e.target.value)}/>
                                            </div>
                                    </div>
                                </label>
                                <br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            <div className='submit'>
                                        <Button variant='success' type="submit">ADD TODO</Button>
                                    </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className='todolist'>
                                    <Table className='list'>
                                        {todos.map((data) => (
                                        <tbody> 
                                            <tr>
                                                <div id="radio">
                                                    <td>
                                                    <label>
                                                        <Checkbox                                                                                                                 
                                                            value={data.id}
                                                            onChange={handleChecked}
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={<CheckCircleOutlineIcon />}
                                                        />

                                                        {data.title}
                                                    </label>
                                                    </td>
                                                </div>
                                            </tr>
                                        </tbody>
                                        ))}
                                    </Table>                                                            
                                </div>
                            </td>
                        </tr> 
                        <tr>
                            <td>Finished ToDos:</td>
                        </tr>  
                        <tr>
                            <td>
                            <Table className='finished_list'>
                                        {finished.map((data) => (
                                        <tbody> 
                                            <tr>
                                                <div id="radio2">
                                                    <td>
                                                    <label>
                                                        <Checkbox
                                                            checked="true"
                                                            value={data.id}
                                                            icon={<RadioButtonUncheckedIcon />}
                                                            checkedIcon={<CheckCircleOutlineIcon />}
                                                        />

                                                        {data.title}
                                                    </label>
                                                    </td>
                                                </div>
                                            </tr>
                                        </tbody>
                                        ))}
                            </Table>      
                            </td>
                        </tr>

                        <br/>
                          
                    </table>
                </form>
            </div>
        </div>
    );
}
export default Todo;