import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div>
            <h1>Landing Page</h1>
            <div>
                
                <button> <Link to="/login">Login</Link></button>
                <button><Link to="/signup">Signup</Link></button>
                    </div>
        </div>
    )
}

export default Landing;