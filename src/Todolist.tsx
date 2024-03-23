import React, {ChangeEvent, useEffect, useMemo, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import s from './AddItemForm.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    selectedTodolists: string[]
    setSelectedTodolists: React.Dispatch<React.SetStateAction<any>>
}


export function Todolist(props: PropsType) {
    const todolistStyle = useMemo(() => {
        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 1; i++) {
                color += letters[Math.floor(Math.random() * 10)];
            }
            return color;
        };
        return {
            backgroundColor: getRandomColor(),
        };
    }, []);



    const [allTasksCompleted, setAllTasksCompleted] = useState(false);

    useEffect(() => {
        const areAllTasksCompleted = props.tasks.length > 0 && props.tasks.every(task => task.isDone);
        setAllTasksCompleted(areAllTasksCompleted || props.tasks.length === 0); // Добавляем условие, чтобы учесть случай отсутствия задач
    }, [props.tasks]);


    const toggleTodolistSelection = () => {
        if (props.selectedTodolists.includes(props.id)) {
            props.setSelectedTodolists(props.selectedTodolists.filter(id => id !== props.id));
        } else {
            props.setSelectedTodolists([...props.selectedTodolists, props.id]);
        }

    };

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return (
        <div className='todolist'>
            <h3
                className={`${props.selectedTodolists.includes(props.id) ? 'selected' : ''}`}
                onClick={toggleTodolistSelection}
            >

                <div className={` ${allTasksCompleted ? 'completedTodolist' : ''}`}>
                    <EditableSpan value={props.title} onChange={changeTodolistTitle}  />
                    <button className={`${s.button} ${s.marginTop}`} onClick={removeTodolist}>RemovTodo</button>
                </div>
            </h3>
            <AddItemForm addItem={addTask} buttonTitle="Add Task"/>
            <ul>
                <div className="button-container">
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>
                        All
                    </button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>
                        Active
                    </button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>
                        Completed
                    </button>
                </div>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    };
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
                            <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                            <div>
                                <button className="deleteButton" onClick={onClickHandler}>
                                    DelleteList
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
