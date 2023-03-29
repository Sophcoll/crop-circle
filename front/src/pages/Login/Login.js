import { useState } from "react"
import { UseLogin } from "../../hooks/useLogin";
import './Login.scss';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = UseLogin()

    const handleSubmit = async (event) => {
        event.preventDefault()

        console.log(email, password)
    }

    return (
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
    )
}

export default Login