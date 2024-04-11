import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"


export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw Error('Make sure to wrap  useAuth inside AuthContextProvider')
    }
    return context
}