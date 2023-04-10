// HOOKS
import { React } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

// STYLE
import './Navbar.scss'

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className='logout'>
        {user && (
          <div className='logout-btn'>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <button>
              {' '}
              <Link to='/signup'>Signup</Link>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
