// HOOKS
import { React } from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Landing = () => {
  //----------------------------------------------------------------------
  // HOOKS

  const { logout } = useLogout();
  const { user } = useAuthContext();

  //----------------------------------------------------------------------
  // CALL BACK FUNCTION

  const handleClick = () => {
    logout();
  };

  //----------------------------------------------------------------------
  return (
    <div>
      <h1>Landing Page</h1>
      <div>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
            <Link to='/home'> Home </Link>
            <Link to='/list/item-category'>Listings</Link>
          </div>
        )}
        {!user && (
          <div>
            <button>
              {' '}
              <Link to='/login'>Login</Link>
            </button>
            <button>
              <Link to='/signup'>Signup</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
