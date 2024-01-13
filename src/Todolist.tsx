import React, {JSX} from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
}


export function Todolist(props: PropsType) {
  let tast
    return <div>
        <div>
            <input/>
            <button>X</button>
        </div>
        <ul> {tasksLists}</ul>
        <div>
            <button>ALL</button>
            <button>ACTIVE</button>K
            <button>Complited</button>
        </div>
    </div>
}
