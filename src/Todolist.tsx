import React, {JSX} from 'react';
import s from './todolist.module.css';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;

};

export const Todolist: React.FC<PropsType> =
    ({tasks,title,removeTask})=> {
   /* const removeTaskHandler = (taskId:number) => {
        removeTask(taskId)
    }*/
        const NewArray: Array<JSX.Element> = tasks.map((newLis) => {


            return (
            <li key={newLis.id}>
                <button className={s.deleteButton} >X</button>
                <input type='checkbox' checked={newLis.isDone}></input>
                <span>{newLis.title}</span>
            </li>
        );
    });


    const tasksLists: JSX.Element = tasks.length ?
        <ul className={s.taskList}>{NewArray}</ul>
        : <span>You taskList is Empty</span>


    return (
        <div className={s.todoCardWrapper}>
            <div className={s.inputContainer}>
             <h3>{title}</h3>
                <input />
                <button className={s.deleteButton} >X</button>
            </div>


            {tasksLists}
            <div className={s.buttonContainer}>
                <button className={s.todoButton}>ALL</button>
                <button className={s.todoButton}>ACTIVE</button>
                <button className={s.todoButton}> Completed</button>
            </div>
        </div>
    );
}
