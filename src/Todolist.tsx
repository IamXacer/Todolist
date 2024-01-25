import React, {ChangeEvent, JSX, MouseEventHandler, useRef, useState} from 'react';
import s from './todolist.module.css';
import {FilterType} from "./App";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void
    changeFilter: (nextValue: FilterType) => void
    addTask:(title:string)=>void

};

export const Todolist: React.FC<PropsType> =
    ({tasks, title, removeTask, changeFilter,addTask}) => {
const [newTaskTitle,setnewTaskTitle] = useState('')
      const removeTaskHandler = (taskId: string) => {
        removeTask(taskId)
      }
      const NewArray:Array<JSX.Element> = tasks.map(t=>{
          return(
              <li key={t.id}>
              <button className={s.deleteButton} onClick={()=>removeTaskHandler(t.id)}>X</button>
                  <input type={'checkbox'} checked={t.isDone}/>
                  <span>{t.title}</span>
          </li>
      )
       })


     const tasksLists:JSX.Element = tasks.length ?
         <ul className={s.taskList}>{NewArray}</ul> : <span>You task is Empty</span>

        const setFilterAll = (nextValue: FilterType) => {
            nextValue === 'all' && changeFilter(nextValue)
        }
        const setFilteractive = (nextValue: FilterType) => {
            nextValue === 'active' && changeFilter(nextValue)
        }
        const setFiltercompleted = (nextValue: FilterType) => {
            nextValue === 'completed' && changeFilter(nextValue)
        }
        const set = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            changeFilter(e.currentTarget.value as FilterType)
        }

       const addTaskHandler = () => {
         addTask(newTaskTitle)
           setnewTaskTitle('')
       }
       const setNewTaskTItle = (e:ChangeEvent<HTMLInputElement>) => {
           setnewTaskTitle(e.currentTarget.value)
       }
        return (
            <div className={s.todoCardWrapper}>
                <div className={s.inputContainer}>
                    <h3>{title}</h3>
                    <input  value={newTaskTitle}
                        onKeyDown={(e)=>{
                            if(e.key ==='Enter'){addTaskHandler()}
                        }}
                          onChange={setNewTaskTItle} />
                    <button onClick={addTaskHandler}
                            disabled={newTaskTitle === '' ||  newTaskTitle.length >= 15}
                    >Add</button>
                   <div>
                       <span>{newTaskTitle.length < 15 ? 'ENter new title':
                           'Your titile is long'}</span>
                   </div>
                </div>


                {tasksLists}
             <div>
                 <button className={s.deleteButton} onClick={set} value={'all'}>ALL</button>
                 <button className={s.deleteButton} onClick={set} value={'active'}>ACTIVE</button>
                 <button className={s.deleteButton} onClick={set} value={'completed'}>Completed</button>
             </div>

            </div>
        );
    }
