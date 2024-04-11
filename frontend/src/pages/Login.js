import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, loading} = useLogin()
    const handleSubmit = async(e) => {
        e.preventDefault()
        await login(email, password)
    }
    return ( 
        <form className ="login"onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label> Email </label>
            <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
             />
            <label> Password </label>
            <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             />

             <button className={loading}>Login</button>
             {error && <div>{ error }</div>}
        </form>
     );
}
 
export default Login;