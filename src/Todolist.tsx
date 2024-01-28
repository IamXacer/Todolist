import React, {ChangeEvent, JSX, MouseEventHandler, useRef, useState} from 'react';
import s from './todolist.module.css';
import {FilterType} from "./App";
import {inspect} from "util";
import {getActiveElement} from "@testing-library/user-event/dist/utils";


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
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
};

export const Todolist: React.FC<PropsType> =
    ({
         tasks, title, removeTask, changeFilter,
         addTask, changeTaskStatus
     }) => {


        const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');

        const [newTaskTitle, setnewTaskTitle] = useState('')
        const [error, setError] = useState<string | null>(null)

        const removeTaskHandler = (taskId: string) => {
            removeTask(taskId)
        }
        const NewArray: Array<JSX.Element> = tasks.map(task => {
            const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(task.id, e.currentTarget.checked)
            }
            return (
                <li  key={task.id}>
                    <button className={s.deleteButton}
                            onClick={(e) => removeTaskHandler(task.id)}>X
                    </button>
                    <input type={'checkbox'} checked={task.isDone} onChange={onchangeHandler}/>
                    <span>{task.title}</span>
                </li>

            )
        })

        const tasksLists: JSX.Element = tasks.length ?
            <ul> {NewArray}</ul> :
            <span>You task is Empty</span>


        const set = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            const selectedValue = e.currentTarget.value as FilterType;
            changeFilter(selectedValue);
            setSelectedFilter(selectedValue);
        };


        const addTaskHandler = () => {
            if (newTaskTitle.trim() !== '') {
                addTask(newTaskTitle)
            } else {
                setError('Title is required')
            }
            setnewTaskTitle('')
        }
        const setnewTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setnewTaskTitle(e.currentTarget.value)
        }
        const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                addTaskHandler()
            }
        }
        const isButtonDisabled = !newTaskTitle || newTaskTitle.length > 15

        const userMassage = newTaskTitle.length < 15 ? <span>Enter you title</span> :
            <span className={s.userMassage}>You title more 15 simvols </span>

        return (
            <div className={s.todoCardWrapper}>
                <div>
                    <h3>{title}</h3>
                 <div> <input className={error ? s.error : ''}
                              value={newTaskTitle}
                              onChange={setnewTaskTitleHandler}
                              onKeyDown={onKeyDownHandler}

                 />
                     <button onClick={addTaskHandler} disabled={isButtonDisabled}>ADd</button></div>

                    {error && <div className={s.errorMessage}>{error}</div>}
                    <div><span>{userMassage}</span></div>
                </div>


                {tasksLists}
                <div>
                    <button
                        className={selectedFilter === "all" ? `${s.deleteButton} ${s.activeFilter}` : s.deleteButton}
                        onClick={set} value={'all'}>ALL
                    </button>
                    <button
                        className={selectedFilter === 'active' ? `${s.deleteButton} ${s.activeFilter}` : s.deleteButton}
                        onClick={set} value={'active'}>ACTIVE
                    </button>
                    <button
                        className={selectedFilter === 'completed' ? `${s.deleteButton} ${s.activeFilter}` : s.deleteButton}
                        onClick={set} value={'completed'}>Completed
                    </button>
                </div>

            </div>
        );
    }
