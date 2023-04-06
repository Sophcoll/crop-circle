// HOOKS
import { React } from 'react';
import { Link } from 'react-router-dom';

// STYLE SHEET
import './Landing.scss';

const Landing = () => {

  //----------------------------------------------------------------------
  return (
    <div className='landing-page'>
      {/* <div className='landing-page__container'> */}
           <h5 className='landing-page__title-top'>Your Friendly neigbourhood</h5>
        <div className="landing-page__circle1"> </div>
          <h1 className='landing-page__title1'>crop</h1>
       
        <div className="landing-page__circle2">
          <h1 className='landing-page__title2'>circle</h1>
        </div>
     
        <h5 className='landing-page__title-bottom'>produce-sharing app</h5>
      {/* </div> */}

      <div>
        <div>
          <button className='landing-page__signin-btn'>
            <Link to='/signup' className='landing-page__link'>Sign in</Link>
          </button>
          <button className='landing-page__login-btn'>
            <Link to='/login' className='landing-page__link'>Login</Link>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Landing;
