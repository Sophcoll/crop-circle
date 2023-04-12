// HOOKS
import { useState, React } from 'react';
import { UseSignup } from '../../hooks/useSignup';
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
  const { user } = useAuthContext();
  const { signup, error, isLoading } = UseSignup();

  const pageTitle = 'join the circle';
  //----------------------------------------------------------------------
  // CALLBACK FUNCTIONS


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
        
        <div className='signup-grid'>
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
               {error && <div className='error signup-footer__error'>{error} </div>}
              
            <div className="signup-footer__conditions">
              <input type="checkbox" name="agree" id="agree" /> <span><p className='signup-footer__p'>    I agree to the terms and conditions</p></span> </div>
            
            <button className='signup-footer__btn' disabled={isLoading}>Sign up</button>

          </form>
          </div>
          </div>
      </div>
    </>
  );
};

export default Signup;
