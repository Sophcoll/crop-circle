import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext"
import { useGetUser } from '../../hooks/useGetUser'

const Profile = () => {

  const { user } = useAuthContext();

  const { userDetails, firstName } = useGetUser();

  useEffect(() => {
    
    if (user) {
      const userEmail = user.email;
      userDetails(userEmail);
    
    }
      // console.log(firstName)
  }, [user])


  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
