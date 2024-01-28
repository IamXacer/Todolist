import React, {useState} from 'react';
import s from './App.module.css';
import {TaskType, Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: crypto.randomUUID(), title: "HTML-CSS", isDone: false},
            {id: crypto.randomUUID(), title: "React", isDone: true},
            {id: crypto.randomUUID(), title: "Js", isDone: false},
            {id: crypto.randomUUID(), title: "Redux", isDone: false},
        ]
    )
    const [filter,setFilter]=useState<FilterType>('all')
const addTask = (title:string) => {
  const newTask = {
      id: crypto.randomUUID(),
      title,
      isDone: false
  }
    setTasks([...tasks,newTask])
}
const removeTask = (taskId:string) => {
   const newtask = tasks.filter(t=>t.id !== taskId)
    setTasks([...newtask])
}
const filtredTask = (allTask:TaskType[],filterValue:FilterType) => {
  switch (filterValue){
      case "completed": return allTask.filter(t=>t.isDone)
      case "active": return allTask.filter(t=>!t.isDone)
      default : return allTask
  }
}
   const changeFilter = (newValue:FilterType)=>{
       setFilter(newValue)
   }

   const filterTaskforRender = filtredTask (tasks,filter)

    const changeTaskStatus = (taskId:string,isDone:boolean) => {
      const status = tasks.find(t=>t.id === taskId)
        if(status){
            status.isDone = isDone
        }
        setTasks([...tasks])
    }
    return (
        <div className={s.backgroundIMG}>
            <div className={s.App}>
                <Todolist title='What to Learn'
                          addTask={addTask}
                          tasks={filterTaskforRender} removeTask={removeTask}
                          changeFilter={changeFilter}
                          changeTaskStatus={changeTaskStatus}
                />
            </div>
        </div>)
}

export default App;
