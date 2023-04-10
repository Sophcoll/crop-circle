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
    // console.log('logged in now send me to home page');
    await login(email, password);
  };

  //----------------------------------------------------------------------
  return (
    <>
      <div className='mobile-card'>
        <div className='mobile-card__grid-top'>
          <Link to="/">
            <button className='btn bck-btn half-btn'>Back</button></Link>
          <div>
              <button className='btn'>
                <Link to='/signup' className='mobile-card__link'>Signup</Link>
              </button>
            </div>
        </div>

        <div className='mobile-card__container'>
          <div className='mobile-card__circle'></div>
          <h1 className='mobile-card__title'>welcome back</h1>
          <div>
            <form className='mobile-card__form' onSubmit={handleSubmit}>

              <div className="grid-left">
                <label className='mobile-card__label' htmlFor='email'>Email</label></div>

              <div className="grid-right"> <input className='mobile-card__input'
                type='email'
                placeholder='joeblogs@gmail.com'
                onChange={(event) => setEmail(event.target.value)}
                name='email'
                value={email}
              /></div>
              <div className="grid-left"> <label className='mobile-card__label'>Password</label></div>
              <div className="grid-right"> <input className='mobile-card__input'
                placeholder='*********'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                name="password"
              /></div>
              <button className='btn full-btn signin' disabled={isLoading}>Sign Up</button>
             <div className='mobile-card__error'>{error && <div className='error'>{error}</div>}</div> 
            </form>
          </div>
        </div>
        <div className="mobile-card__footer">
          <div><button className='half-btn'>google</button></div>
         <div><button className='half-btn'>facebook</button></div> 
        </div>
      </div>
    </>
  );
};

export default Login;
