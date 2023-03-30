// HOOKS 
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ListingDetails = () => {

  //----------------------------------------------------------------------
  // USE STATES & GLOBAL VARIABLES

  // stores the listing details that are being retrieved in the GET request to the database below
  const [ listingDetails, setListingDetails ] = useState(null);

  // listing ID being passed through the react router 'Link' from the homepage using the useParams() hook
  const listingId = useParams().i


  //----------------------------------------------------------------------
  // GET REQUEST WITH SPECIFIC ID TO DATABASE ON PAGE LOAD

  useEffect(() => {
    const fetchListingDetails = async (listingId) => {
      const response = await fetch(`http://localhost:4000/listings/${listingId}`);
      const json = await response.json();

      if (response.ok) {
        setListingDetails(json);
      }
    };

    fetchListingDetails(listingId);
  }, []);


  //----------------------------------------------------------------------
    return ( 
        <div>
            <Link to="/home">
            <button>Go Back</button>
            </Link>
           {listingDetails && listingDetails ? (
            <div>
                <h1>{listingDetails.name}</h1>
                <p>Exchanging for: {listingDetails.exchange}</p>
                <p>{listingDetails.exchangeDescription ? listingDetails.exchangeDescription : null}</p>
                <p>Description: {listingDetails.description}</p>
                <p>Quantity: {listingDetails.quantity}</p>
                <p>Pickup location: {listingDetails.location}</p>
                <p>Pickup time: {listingDetails.pickup}</p>
            </div>
      ) : null}
        </div>
     );
}
 
export default ListingDetails;