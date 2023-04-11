// HOOKS
import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import { UseSignup } from '../../hooks/useSignup';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

// COMPONENTS
import Circle from '../../components/circle/Circle';

// STYLE SHEET
import './Signup.scss';
import BackNav from '../../components/back-nav/BackNav';

const Signup = () => {
  //----------------------------------------------------------------------
  // USE STATES & USE CONTEXT

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { signup, error, isLoading } = UseSignup();
  //   const navigate = useNavigate(); // <--- Temporarily removed this from the imports at top of page because it's not yet being used and was throwing lint errors

  const pageTitle = 'join the circle';
  //----------------------------------------------------------------------
  // CALLBACK FUNCTIONS

  // logout
  const handleClick = function () {
    logout();
  };

  // signup
  const handleSubmit = async function (event) {
    // stop default page refresh on form submit
    event.preventDefault();
    // use static sign up function from userModel
    await signup(firstName, lastName, email, password);
  };

  //----------------------------------------------------------------------
  return (
    <>
      <div className='signup'>
          <BackNav />
        <div className='signup-body'>
          <Circle pageTitle={pageTitle} />
        </div>
        <div className='signup-footer'>
          <form className='signup-footer__form' onSubmit={handleSubmit}>
            <div className='signup-footer__grid'>
              <label className='signup-footer__label'>First Name: </label>
              <input
                placeholder='Joe'
                className='signup-footer__input'
                type='text'
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>
            <div className='signup-footer__grid'>
              <label className='signup-footer__label'>Last Name: </label>
              <input
                placeholder='Bloggs'
                className='signup-footer__input'
                type='text'
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
              />
            </div>
            <div className='signup-footer__grid'>
              <label className='signup-footer__label'>Email: </label>
              <input
                placeholder='joebloggs@gmail.com'
                className='signup-footer__input'
                type='email'
                onChange={(event) => setEmail(event.target.value)}
                value={email}
              />
            </div>
            <div className='signup-footer__grid'>
              <label className='signup-footer__label'>password</label>
              <input
                placeholder='*********'
                className='signup-footer__input'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
                value={password}
              />
            </div>

            <div className="signup-footer__conditions">
              <input type="checkbox" name="agree" id="agree" /> <span><p className='signup-footer__p'>    I agree to the terms and conditions</p></span> </div>
            
               {error && <div className='error signup-footer__error'>{error}</div>}
            <button className='signup-footer__btn' disabled={isLoading}>Sign up</button>

          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
