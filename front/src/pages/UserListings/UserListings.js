import { Link } from "react-router-dom"

// import ListingCard from "../components/cards/ListingCard"

import { useState, useEffect } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useGetUser } from "../../hooks/useGetUser"


const UserListings = () => {

  const [listingArray, setListingArray] = useState(null)
  const { user } = useAuthContext()
  const { userDetails, ID } = useGetUser()


  useEffect(() => {

  if(user){
  const userEmail = user.email
  userDetails(userEmail)
  }
  }, [user])

  useEffect(() => {

  if(ID){
    const userListingData = async () => {
    const response = await fetch(`/user-listings/${ID}`, {method: "GET"})
    const data = await response.json()
    const dataArray = data
    setListingArray(dataArray)
    }
    userListingData()
  }
  }, [ID])


 

 return(
  <div>
   <p>User Listings</p>
   {listingArray ? {listingArray} : null}
   </div>
  )

}

export default UserListings