import { useEffect } from 'react'
import { useAuthContext } from "../../hooks/useAuthContext"
import { useGetUser } from '../../hooks/useGetUser'

const Confirmation = () => {
  const { user } = useAuthContext();

  const { userDetails, firstName } = useGetUser();

  useEffect(() => {
    if (user) {
      const userEmail = user.email;
      userDetails(userEmail);
   }
 }, [user])



  return (
    <div className='welcome'>
      <div className='welcome-header' >
        <h2 className='welcome-header__title'>crop <span className='welcome-header__horizontal-line'> <hr /></span>circle</h2>
      </div>

      <h1>Welcome {user && { firstName }}</h1>
    </div>
  );
}

export default Confirmation;