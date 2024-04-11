import {  useContext, useEffect } from "react";
import Calendar from "../components/Calender"
import TodoDetails from "../components/TodoDetails";
import TodoForm from "../components/TodoForm";
import { TodoContext } from "../context/TodoContext";
import { useAuth } from "../hooks/useAuth"


const Home = () => {
    const {todos, dispatch} = useContext(TodoContext)
    const { user } = useAuth()
  
    useEffect(() => {
        const fetchTodos = async() => {
            const response = await fetch('/api/todos', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
               dispatch({type:'SET_TODOS', payload: json})
            }
        }
        if(user){
            fetchTodos()
        }
    },[dispatch, user])
    return ( 
        <div className="Home-container">
            <h2>Home</h2>
            <div className="homepage">
            <Calendar />
            <div className="space">
                <h2>Todo</h2>
                    <TodoForm />
                    {
                        todos && todos.map((todo) => (
                            <TodoDetails todos ={todo} key={todo._id}/>
                        ))
                    }
                    
            </div>

        </div>
        </div>
     );
}
 
export default Home;