import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout';
import { useAuth } from '../hooks/useAuth';
 const NavBar = () => {
     const {logout} = useLogout()
     const {user} = useAuth()
    const handleClick = () => {
        logout()
    }
    return ( 
        <header>
            <div className="container">
            <Link to ='/'> <h1>OrganiZ</h1></Link>

            <nav>
                {user && 
                    <div>
                        <span>{user.email}</span>
                    <button onClick={handleClick}>logout</button>
                    </div>
                }
                {
                    !user && 
                    <div>
                    <Link to='/login'> Login  </Link>
                    <Link to='/register'> Sign up </Link>
                </div>
                }
            </nav>
        </div>
        </header>
     );
}
 
export default NavBar;