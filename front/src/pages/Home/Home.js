import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <button> <Link to="/login">Login</Link></button>
                <button><Link to="/signup">Signup</Link></button>
                    </div>
        </div>
    )
}

export default Home