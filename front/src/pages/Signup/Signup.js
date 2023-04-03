// HOOKS
import { useState, React } from 'react';
import { Link } from 'react-router-dom';
import { UseSignup } from '../../hooks/useSignup';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

// STYLE SHEET
import './Signup.scss';

const Signup = () => {
  //----------------------------------------------------------------------
  // USE STATES & GLOBAL VARIABLES

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const navigate = useNavigate(); // <--- Temporarily removed this from the imports at top of page because it's not yet being used and was throwing lint errors

  //----------------------------------------------------------------------
  // HOOKS

  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { signup, error, isLoading } = UseSignup();

  //----------------------------------------------------------------------
  // CALL BACK FUNCTIONS

  const handleClick = () => {
    logout();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    await signup(email, password);
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
              <Link to='/login'>Login</Link>
            </button>
          </div>
        )}
      </div>
      <form className='signup' onSubmit={handleSubmit}>
        <h3>Sign up</h3>

        <label> first name</label>
        <input type="text" />

        <label> last name</label>
        <input type="text" />

        <label>email: </label>
        <input
          type='email'
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />

        <label>password</label>
        <input
          type='password'
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Sign up</button>
        {error && <div className='error'>{error}</div>}
      </form>
    </>
  );
};

export default Signup;
