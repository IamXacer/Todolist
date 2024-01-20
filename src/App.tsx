import React, {useState} from 'react';
import s from './App.module.css';
import {TaskType, Todolist} from './Todolist';
type FilterType= 'all'|'active'|'completed'
function App () {
const [task,setTask1] = useState<Array<TaskType>>(
    [
        {id:0, title:"HTML-CSS", isDone:false},
        {id:1, title:"React", isDone:true},
        {id:2, title:"Js" ,isDone:false},
        {id:3, title:"Redux" ,isDone:false},
    ]
)
    const [tasks2, setTasks2] = useState<Array<TaskType>>([
        { id: 0, title: "MILK", isDone: false },
        { id: 1, title: "BREAD", isDone: true },
        { id: 2, title: "Eat", isDone: false },
    ]);

const removeTask = (taskId:number) => {

}
    const [tasks3, setTasks3] = useState([]);
const [filter,setFilter]= useState<FilterType>('all')
    const FilterTask = (alltask:Array<TaskType>,filterValue:FilterType)=>{
switch (filterValue){
    case "active": return alltask.filter(t=>!t.isDone )
    case "completed": return alltask.filter(t=>t.isDone )
    default:return  alltask
}
    }
const filtredTask = FilterTask(task,filter)
    return (
        <div  className={s.backgroundIMG}>
            <div className={s.App}>

                <Todolist title='What to Learn' tasks={filtredTask} removeTask={removeTask}/>
                {/*<Todolist title='What to buy' tasks={tasks2}  removeTask={removeTask}/>
                <Todolist title='What to buy' tasks={tasks3}  removeTask={removeTask}/>*/}

            </div>


        </div>)
}

export default App;
