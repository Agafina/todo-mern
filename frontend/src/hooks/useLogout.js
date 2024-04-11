import { useContext } from "react"
import { useAuth } from "./useAuth"
import { TodoContext } from "../context/TodoContext"


export const useLogout = () => {
    const {dispatch} = useAuth()
    const { dispatch: todoDispatch} = useContext(TodoContext)
    const logout = () => {
        localStorage.removeItem('user')

        dispatch({type:'LOGOUT'})
        todoDispatch({type:'SET_TODOS', payload:null})
    }
    return {logout}
}