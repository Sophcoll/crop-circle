// HOOKS
import { React } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';

// COMPONENTS
import BackNav from '../../components/back-nav/BackNav';

// style
import './Menu.scss'


const Menu = () => {

    const greenBackground = true;


    const { logout } = useLogout();
    const handleClick = () => {
        logout();

    };

    return (
        <div className='menu'>
            <div className='menu-header'>
                <BackNav greenBackground={greenBackground} />

            </div>
            <div className='menu-body'>

                <div className='menu-body__link'>
                    <Link to='/' onClick={handleClick}>
                        <h2 className='menu-body__link-title'>Logout</h2>
                    </Link></div>
                <div className="menu-body__link">
                    <Link to='/menu/watchlist'>
                        <h2 className='menu-body__link-title'> Watchlist </h2>
                    </Link>
                </div>
                <div className="menu-body__link">
                    <Link to='/menu/messages'>
                        <h2 className='menu-body__link-title'>Messages</h2>
                    </Link>
                </div>
                <div className="menu-body__link">
                    <Link to='/menu/listings'>
                        <h2 className='menu-body__link-title'>Listings</h2>
                    </Link>
                </div>

                <div className="menu-body__link">
                    <Link to='/menu/profile'>
                        <h2 className='menu-body__link-title'> Profile </h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Menu