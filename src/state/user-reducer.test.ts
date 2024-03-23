import { userReducer } from './user-reducer'
import { v1 } from 'uuid'


test('user reducer change name of user', () => {
   const startState = {name:'Alex', age:20, childrenCount:2}
    const newName = 'Viktor'

    const endState = userReducer(startState,
        {type:'CHANGE_NAME',newName:newName})
    expect(endState.name).toBe(newName)
})