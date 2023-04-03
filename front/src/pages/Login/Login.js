// HOOKS
import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import { UseLogin } from '../../hooks/useLogin';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

// STYLE SHEET
import './Login.scss';

const Login = () => {
  //----------------------------------------------------------------------
  // USE STATES

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //----------------------------------------------------------------------
  // HOOKS

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { login, error, isLoading } = UseLogin();

  //----------------------------------------------------------------------
  // CALL BACK FUNCTIONS

  const handleClick = () => {
    logout();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    await login(email, password);
  };

  //----------------------------------------------------------------------
  return (
    <>
      <div>
        {user && (
          <div>
            <span>{user.email}</span>
            <button onClick={handleClick}>Logout</button>
            <Link to='/home'> Home </Link>
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
      <form className='login' onSubmit={handleSubmit}>
        <h3>Log in</h3>

        <label>Email</label>
        <input
          type='email'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />

        <label>Password</label>
        <input
          type='password'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Log in</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </>
  );
};

export default Login;
