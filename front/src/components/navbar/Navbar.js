import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1 className='title'>Nav to home page</h1>
                </Link>
                <nav>
                    <div>
                    <Link to="/menu">Menu</Link>
                    <Link to="/addlisting">Add</Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar