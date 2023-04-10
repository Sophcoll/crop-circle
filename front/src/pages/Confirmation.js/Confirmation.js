import { Link } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext"


import './Confirmation.scss'

const Confirmation = () => {

  const { user } = useAuthContext();


  return (
    <>
      <div className='welcome'>
        <div className='welcome-header' >
          <div><h5 className='welcome-header__child1'> crop </h5> </div>
            <div className='welcome-header__child2'>
            <hr className='welcome-header__hr-line' /></div> 
        
        <div className='welcome-header__child3'> <h5>circle</h5></div>
        </div>
        <div className='welcome-body'>
        <h1 className='welcome-body__title'>Welcome - {user.email} </h1>
        <p className='welcome-body__p'>to your friendly neighbourhood produce-sharing app</p>  
         </div>
      
        <div className="welcome-footer">
           <Link to={'/home'}>
        <div className='welcome-footer__btn'>enter</div>
      </Link>
        </div>
      </div>
       
    </>
  )
};


export default Confirmation;