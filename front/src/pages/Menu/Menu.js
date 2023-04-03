// HOOKS
import { React } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Navbar from "../../components/navbar/Navbar"

const Menu = () => {
    
    return (
        <div>
            <Navbar></Navbar>
            <Link to='/menu/profile'>
            <h1>Profile</h1>
            </Link>
            <Link to='/menu/messages'>
            <h1>Messages</h1>
            </Link>
            <Link to='/menu/listings'>
            <h1>Listings</h1>
            </Link>
            <Link to='/menu/watchlist'>
            <h1>Watchlist</h1>
            </Link>
        </div>
    )

}

export default Menu