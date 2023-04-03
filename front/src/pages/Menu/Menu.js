import { Link } from 'react-router-dom'

// components
import Navbar from "../../components/navbar/Navbar"


const Menu = () => {
    
    return (
        <div>
            <Navbar></Navbar>
            <h1>Menu</h1>
            <p>My Profile</p>
            <Link to="/home"> Home </Link>
            <Link to='/messages'> My Messages </Link>
            <Link to="/listings"> My Listings </Link>
            <Link to="/list/item-category">Add Listing </Link>
        </div>
    )
}

export default Menu