import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import { useAuth } from "../hooks/useAuth";

const TodoForm = () => {
    const { dispatch } = useContext(TodoContext);
    const [todo, setTodo] = useState('');
    const [error, setError] = useState(null);
    const { user } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
            return
        }
        try {
            const newTodo = { todo };
            const response = await fetch('/api/todos', {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                 },
                body: JSON.stringify(newTodo),
                method: 'POST'
            });
            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.error);
            }
            const json = await response.json();
            setTodo('');
            setError(null);
            dispatch({ type: 'CREATE_TODO', payload: json });
            console.log('added', json);
        } catch (error) {
            setError(error.message);
        }
    };

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    required
                    placeholder="Enter Your Task here"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)} 
                />
                
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};
 
export default TodoForm;
