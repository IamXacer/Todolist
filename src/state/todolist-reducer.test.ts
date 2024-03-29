import {
    ChangeFilterTodolistActiionType,
    ChangeTitleAC,
    ChangeTitleTodolistActiionType,
    todolistReducer
} from './todolist-reducer'
import { v1 } from 'uuid'
import {FilterValuesType, TodolistType} from './../App'

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState,
        {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer
    (startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})
test('correct todolist filter', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter:FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ]
    const action:ChangeFilterTodolistActiionType = {
        type: 'CHANGE_FILTER' as const,
        id:todolistId2,
        filter:newFilter
    }

    const endState = todolistReducer(startState,action)

    expect(endState.length).toBe(2)
    expect(endState[1].filter).toBe(newFilter)
})
test('correct todolist title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'completed'}
    ]
    const action = ChangeTitleAC (todolistId2,newTitle)

    const endState = todolistReducer(startState,action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})