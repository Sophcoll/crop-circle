// HOOKS
import { useState, useEffect, React } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

const ListingDetails = () => {
  //----------------------------------------------------------------------
  // USE STATES & PARAMS

  // stores the listing details that are being retrieved in the GET request to the database below
  const [listingDetails, setListingDetails] = useState(null);

  // listing id to use as parameter in GET request below to find specific listing
  const listingId = useParams().listingId;

  // navigate hook to programmatically redirect back to 'Home' component after delete button clicked
  const navigate = useNavigate();

  // instantiating user from useAuthContext hook to be used within the submit handler below
  const { user } = useAuthContext();

  //----------------------------------------------------------------------
  // GET REQUEST WITH SPECIFIC ID TO DATABASE ON PAGE LOAD

  useEffect(() => {
    const fetchListingDetails = async (listingId) => {
      const response = await fetch(
        `http://localhost:4000/listings/${listingId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setListingDetails(json);
      }
    };
    if (user) {
      fetchListingDetails(listingId);
    }
  }, [user]);

  //----------------------------------------------------------------------
  // DELETE REQUEST USING SPECIFIC ID ON CLICK OF DELETE BUTTON

  const handleDelete = async () => {
    // we first want to check and see if there is even a user logged in else we won't bother with the rest of the function
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:4000/listings/${listingId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
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
  // FORM SUBMIT FUNCTION TO ADD COMMENTS

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('submitted');
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

      <div>
        <h2>Comments</h2>
        <div>
          <p>Author of comment</p>
          <p>Comment</p>
          <p>Time comment posted</p>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <textarea name='' id='' cols='30' rows='10'></textarea>
            <button>Leave comment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
