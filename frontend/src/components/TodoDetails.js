import React, { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { useAuth } from "../hooks/useAuth";
const TodoDetails = ({ todos }) => {
    const { dispatch } = useContext(TodoContext);
    const {user} = useAuth()
    const handleDelete = async () => {
        if(!user){
            return
        }
        const response = await fetch(`/api/todos/${todos._id}`, {
            method: "DELETE",
            headers: {'Authorization': `Bearer ${user.token}`}
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_TODO", payload: json });
        }
    };

   

    return (
        <div className="todo-details">
            <div className="todo-card">
                    <p>{todos.todo}</p>
                <div className="icons">
                         <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
                </div>
            </div>
        </div>
    );
};

export default TodoDetails;
