import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App () {

    const task1 = [
        {id:0, title:"HTML-CSS", isDone:false},
        {id:1, title:"React", isDone:true},
        {id:2, title:"Js" ,isDone:false},
        {id:3, title:"Redux" ,isDone:false},
    ]

    const task2 = [
        {id:0, title:"MILK", isDone:false},
        {id:1, title:"BREAD", isDone:true},
        {id:2, title:"Eat" ,isDone:false},
    ]
    const task3: { id: number; title: string; isDone: boolean; }[] = [

    ]
    return (
        <div className='App'>

        <Todolist title='What to Learn' tasks={task1}/>
        <Todolist title='What to buy' tasks={task2}/>
        <Todolist title='What to buy' tasks={task3}/>

        </div>)
}

export default App;
