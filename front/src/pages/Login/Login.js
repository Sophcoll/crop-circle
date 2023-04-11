// HOOKS
import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import { UseLogin } from '../../hooks/useLogin';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

// COMPONENTS
import Circle from '../../components/circle/Circle';
import BackNav from '../../components/back-nav/BackNav';

// STYLE SHEET
import './Login.scss';

const Login = () => {

  const pageTitle = 'welcome back';
  //----------------------------------------------------------------------
  // USE STATES & USE CONTEXT
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { login, error, isLoading } = UseLogin();

  //----------------------------------------------------------------------
  // CALLBACK FUNCTIONS

  // logout
  const handleClick = function () {
    logout();
  };

  // login
  const handleSubmit = async function (event) {
    // stop default page refresh on form submit
    event.preventDefault();
    await login(email, password);
  };

  //----------------------------------------------------------------------
  return (
    <>
      <div className='login'>

        <div className='login-grid'>
          {/* <Link to="/">
            <button className='bck-btn half-btn'>Back</button></Link> */}
            <BackNav />
          <Link to='/signup'>
            <button className='bck-btn half-btn'> Signup
            </button></Link>
        </div>

    <div className='login-media'>
        <div className='login-circle'>
          <Circle pageTitle={pageTitle} />
        </div>

        <div className='login-body'>
          <form className='login-body__form' onSubmit={handleSubmit}>
            <div className='login-body__grid'>
            <div className="login-body__left">
              <label className='login-body__label' htmlFor='email'>Email</label></div>

            <div className="login-body__right"> <input className='login-body__input'
              type='email'
              placeholder='joeblogs@gmail.com'
              onChange={(event) => setEmail(event.target.value)}
              name='email'
              value={email}
            /></div>
            <div className="login-body__left"> <label className='login-body__label'>Password</label></div>
            <div className="login-body__right"> <input className='login-body__input'
              placeholder='*********'
              type='password'
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              name="password"
              /></div>
              </div>
            <div className='login-footer__error'>{error && <div className='login-error-message'>{error}</div>}</div>
           
              <button className='btn full-btn signin' disabled={isLoading}>sign in</button>
          </form>

        </div>
</div>
        <div className="login__footer">
          <div><button className='half-btn'>google</button></div>
          <div><button className='half-btn'>facebook</button></div>
        </div>
      </div>
    </>
  );
};

export default Login;
