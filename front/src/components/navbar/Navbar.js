import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const {user } = useAuthContext()
    const handleClick = (event) => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1 className='title'>Nav to home page</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                        <span>{user.email }</span>
                            <button onClick={handleClick}>Logout</button>
                        <Link to="/menu">Menu</Link>
                    <Link to="/add-listing">Add</Link>
                    </div>
                )}
            {!user && (
                        <div>
                <button> <Link to="/login">Login</Link></button>
                <button><Link to="/signup">Signup</Link></button>
                        </div>
                         )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar