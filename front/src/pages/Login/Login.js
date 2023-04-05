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
    console.log('logged in now send me to home page');
    await login(email, password);
  };

  //----------------------------------------------------------------------
  return (
    <>
      <div className='crop--circle'>
        <div className='grid-navigation__top'>
          <Link to="/">
            <button className='btn bck-btn half-btn'>Back to landing</button></Link>
          {user && (
            <div>
              <span>{user.email}</span>
              <button className='btn' onClick={handleClick}>Logout</button>
              <Link to='/home'> Home </Link>
            </div>
          )}
          {!user && (
            <div>
              <button className='btn'>
                {' '}
                <Link to='/signup' className='crop-link'>Signup</Link>
              </button>
            </div>
          )}
        </div>

        <div className='crop--circle__container'>
          <div className='crop--circle__circle'></div>
          <h1 className='crop--circle__title'>welcome back</h1>
          <div>
            <form className='crop--circle__form' onSubmit={handleSubmit}>

              <div className="grid-left">
                <label className='crop--circle__label'>Email</label></div>

              <div className="grid-right"> <input className='crop--circle__input'
                type='email'
                placeholder='joeblogs@gmail.com'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              /></div>

              <div className="grid-left"> <label className='crop--circle__label'>Password</label></div>
              <div className="grid-right"> <input className='crop--circle__input'
                placeholder='*********'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              /></div>


              <button className='btn full-btn signin' disabled={isLoading}>Sign in</button>
              {error && <div className='error'>{error}</div>}
            </form>
          </div>
        </div>
        <div className="grid-navigation__footer">
          <button className='btn half-btn'>google</button>
          <button className='btn half-btn'>facebook</button>
        </div>
      </div>
    </>
  );
};

export default Login;
