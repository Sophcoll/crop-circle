// HOOKS
import { useState, useEffect, React } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ListingDetails = () => {

  //----------------------------------------------------------------------
  // USE STATES & PARAMS

  // stores the listing details that are being retrieved in the GET request to the database below
  const [listingDetails, setListingDetails] = useState(null);

  // listing id to use as parameter in GET request below to find specific listing
  const listingId = useParams().i;

  // navigate hook to programmatically redirect back to 'Home' component after delete button clicked
  const navigate = useNavigate();


  //----------------------------------------------------------------------
  // GET REQUEST WITH SPECIFIC ID TO DATABASE ON PAGE LOAD

  useEffect(() => {
    const fetchListingDetails = async (listingId) => {
      const response = await fetch(
        `http://localhost:4000/listings/${listingId}`
      );
      const json = await response.json();

      if (response.ok) {
        setListingDetails(json);
      }
    };

    fetchListingDetails(listingId);
  }, []);

  //----------------------------------------------------------------------
  // DELETE REQUEST USING SPECIFIC ID ON CLICK OF DELETE BUTTON

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/listings/${listingId}`,
      {
        method: 'DELETE',
      }
    );
    const json = await response.json();

    if (response.ok) {
      setListingDetails(json);
      navigate('/home/');
    }
    if (!response.ok) {
      console.log('response not ok');
    }
  };

  //----------------------------------------------------------------------
  return (
    <div>
      <Link to='/home'>
        <button>Go Back</button>
      </Link>
      {listingDetails && listingDetails ? (
        <div>
          <h1>{listingDetails.name}</h1>
          <p>Exchanging for: {listingDetails.exchange}</p>
          <p>
            {listingDetails.exchangeDescription
              ? listingDetails.exchangeDescription
              : null}
          </p>
          <p>Description: {listingDetails.description}</p>
          <p>Quantity: {listingDetails.quantity}</p>
          <p>Pickup location: {listingDetails.location}</p>
          <p>Pickup time: {listingDetails.pickup}</p>
          <Link
                to={`/listings/${listingDetails._id}/edit`}
                state={listingDetails}
                key={listingDetails._id}
              >
          <button>Edit</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : null}
    </div>
  );
};

export default ListingDetails;
