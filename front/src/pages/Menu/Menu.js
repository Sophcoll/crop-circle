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
                {/* <Link to='/home'>
                    <button className='menu-header__link'>home</button></Link> */}
            </div>
            <div className='menu-body'>

                <div className='menu-body__link'>
                   <Link to='/' onClick={handleClick}>
                        <h1 className='menu-body__link-title'>Logout</h1>
                   </Link></div>
                <div className="menu-body__link">
                    <Link to='/menu/messages'>
                        <h1 className='menu-body__link-title'>Messages</h1>
                    </Link>
                </div>
                <div className="menu-body__link">
                    <Link to='/menu/listings'>
                        <h1 className='menu-body__link-title'>Listings</h1>
                    </Link>
                </div>
                <div className="menu-body__link">
                    <Link to='/menu/watchlist'>
                        <h1 className='menu-body__link-title'> Watchlist </h1>
                    </Link>
                </div>
                  <div className="menu-body__link">
                    <Link to='/menu/profile'>
                        <h1 className='menu-body__link-title'> Profile </h1>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Menu