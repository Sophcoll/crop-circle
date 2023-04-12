// HOOKS
import { React } from 'react';
import { Link } from 'react-router-dom';

import './Landing.scss'

export const LandingView = () => {

    return (
     <div className='landing'>
      <div className='landing__container'>
        <h5 className='landing__title-top'>your friendly neigbourhood</h5>


        <div className="landing__circle1">
          <h1 className='landing__title1'>crop</h1>
        </div>


        <div className="landing__circle2">
          <h1 className='landing__title2'>circle</h1>
        </div>

        <h5 className='landing__title-bottom'>produce-sharing app</h5>
      </div>

      <div>
        <div className='landing-footer'>
          <button className='landing__signin-btn'>
            <Link to='/signup' className='landing__link'>Sign Up</Link>
          </button>
          <button className='landing__login-btn'>
            <Link to='/login' className='landing__link'>Login</Link>
          </button>
        </div>
      </div>

    </div>
)

}

