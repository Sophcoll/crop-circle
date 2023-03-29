import { useState } from "react"
import { UseSignup } from "../../hooks/useSignup"

// components
import './Signup.scss'


const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
      const {signup, error, isLoading} = UseSignup()

    const handleSubmit = async (event) => {
        event.preventDefault()

          console.log(email, password)
        await signup(email, password)
    }

    return (
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
            {error && <div className="error">{ error}</div>}
        </form>
    )
}

export default Signup