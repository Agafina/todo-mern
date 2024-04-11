import { useState } from "react"
import { useAuth } from "./useAuth"


export const  useLogin = () => {
    const [error, setError] = useState(null)
    const [loading, setIsLoading] = useState(null)
    const {dispatch} = useAuth()

    const login = async(email, password) => {
        setError(null)
        setIsLoading(true)


        const response = await fetch('/api/users/login', {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setIsLoading(false)
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload: json})
        }
    }
    return{login, error, loading}
} 