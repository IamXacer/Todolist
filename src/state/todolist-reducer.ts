import React from "react";
import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type AddTodolistActiionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeFilterTodolistActiionType = {
    type: 'CHANGE_FILTER'
    id: string
    filter: FilterValuesType
}
export type ChangeTitleTodolistActiionType = {
    type: 'CHANGE_TITLE'
    id: string
    title: string
}
export type RemoveTodolistActiionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type ActionType = RemoveTodolistActiionType
    | ChangeFilterTodolistActiionType
    | AddTodolistActiionType
    | ChangeTitleTodolistActiionType
export const todolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: v1(), title: action.title, filter: 'all'};
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        }
        case 'CHANGE_FILTER': {
            const todolist = state.find
            (tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state] }
        case 'CHANGE_TITLE': {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl   })
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}
export const removeTodoAC = (id: string, title: string):RemoveTodolistActiionType => {
return{type:'REMOVE-TODOLIST',id:id}
}
export const addTodoAC = (title: string):AddTodolistActiionType => {
    return {type: 'ADD-TODOLIST',title: title} as const
}
export const ChangeFilterTodoAC = (todoId: string, filter: FilterValuesType):ChangeFilterTodolistActiionType => {
    return {type:'CHANGE_FILTER',id:todoId,filter: filter} as const
}
export const ChangeTitleAC = (todoId: string, title: string):ChangeTitleTodolistActiionType => {
    return {type:"CHANGE_TITLE",id:todoId,title: title} as const
}