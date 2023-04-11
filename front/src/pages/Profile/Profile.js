import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext"

const Profile = () => {

  const { user } = useAuthContext();



  return (
    <div>
      <h1>Profile </h1>
    </div>
  );
};

export default Profile;
