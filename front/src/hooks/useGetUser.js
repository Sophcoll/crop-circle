import { useState } from 'react'


export const useGetUser = () => {

 const [ firstName, setFirstName ] = useState()
 const [ lastName, setLastName ] = useState()
 const [ email, setEmail ] = useState()
 const [ userId, setUserId] = useState()

 const userDetails = (userEmail) => {

  const getUserDetails = async (req, res) => {
  const response = await fetch(`http://localhost:4000/users/${userEmail}`, {method: "GET"})
  const userResponse = await response.json()

      const user = userResponse[0]
      
     console.log(user, userResponse)
     console.log(user.firstName, user.email)
  setFirstName(user.firstName)
  setLastName(user.lastName)
  setEmail(user.email)
  setUserId(user._id)
  }
  
  getUserDetails()
 }
 
 return { userDetails, firstName, lastName, email, userId }

}