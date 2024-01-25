import React, {useState} from 'react';
import s from './App.module.css';
import {TaskType, Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [task, setTask] = useState<Array<TaskType>>(
        [
            {id: crypto.randomUUID(), title: "HTML-CSS", isDone: false},
            {id: crypto.randomUUID(), title: "React", isDone: true},
            {id: crypto.randomUUID(), title: "Js", isDone: false},
            {id: crypto.randomUUID(), title: "Redux", isDone: false},
        ]
    )
    
    const addTask = (title:string) => {

        const newTask:TaskType = {
            id: crypto.randomUUID(),
            title,
            isDone:false
        }
        setTask([{id: crypto.randomUUID(), title, isDone:false},...task])
    }


  const removeTask = (taskId:string) => {
      setTask(task.filter(t=>t.id !== taskId ))
  }

const [filter,setFilter] = useState<FilterType>('all')
    const filtredTask = (allTask:Array<TaskType>,filterValue:FilterType):Array<TaskType> => {
      switch (filterValue){
          case "completed": return allTask.filter(t=>t.isDone )
          case "active": return allTask.filter(t=>!t.isDone)
          default: return allTask
      }
    }

 const changeFilter = (newValue:FilterType) => {
     setFilter(newValue)
 }

const filterTaskforRender:Array<TaskType> = filtredTask(task,filter)
  
    return (
        <div className={s.backgroundIMG}>
            <div className={s.App}>
                <Todolist title='What to Learn'
                          addTask={addTask}
                          tasks={filterTaskforRender} removeTask={removeTask}
                          changeFilter={changeFilter}/>
            </div>
        </div>)
}

export default App;
