import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { UseSignup } from "../../hooks/useSignup"
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import './Signup.scss'


const Signup = () => {
     const { logout } = useLogout()
    const {user } = useAuthContext()
    const handleClick = (event) => {
        logout()
    }
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
      const {signup, error, isLoading} = UseSignup()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("signed up now send me to confirmation page")
        console.log(email, password)
        await signup(email, password)
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
                <button> <Link to="/login">Login</Link></button>
                        </div>
                         )}
            </div>
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label >Email address: </label>
            <input type="email"
                onChange={(event) => setEmail(event.target.value)} 
                value={email}
            />

               <label >Password</label>
            <input type="password"
                onChange={(event) => setPassword(event.target.value)} 
                value={password}
            />

             <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}

        </form>
       </>      
    )
}

export default Signup