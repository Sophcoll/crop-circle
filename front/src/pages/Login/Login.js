import { useState } from "react"
import { UseLogin } from "../../hooks/useLogin";
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { Link } from 'react-router-dom'

// components
import './Login.scss';


const Login = () => {
    const { logout } = useLogout()
    const {user } = useAuthContext()
    const handleClick = (event) => {
        logout()
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = UseLogin()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("logged in now send me to home page")
        console.log(email, password)
        await login(email, password)
    }

    return (
        <>
              <div>
                {user && (
                        <div>
                    <span>{user.email }</span>
                    <button onClick={handleClick}>Logout</button>
                        <Link to="/home"> Home </Link>
                     </div>
                )}
            {!user && (
                        <div>
                <button> <Link to="/signup">Signup</Link></button>
                        </div>
                         )}
            </div>
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label >Email</label>
            <input type="email"
                onChange={(event) => setEmail(event.target.value)} 
                value={email}
            />

               <label >Password</label>
            <input type="password"
                onChange={(event) => setPassword(event.target.value)} 
                value={password}
            />

           <button disabled={isLoading}>Log in</button>
            {error && <div className="error">{ error }</div>}
            </form>
            </>
    )
}

export default Login