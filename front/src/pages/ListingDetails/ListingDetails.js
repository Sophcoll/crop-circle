// HOOKS
import { useState, useEffect, React } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// STYLE SHEET
import './ListingDetails.scss';

const ListingDetails = () => {
  //----------------------------------------------------------------------
  // USE STATES, HOOKS & PARAMS

  // stores the listing details that are being retrieved in the GET request to the database below
  const [listingDetails, setListingDetails] = useState(null);
  const [error, setError] = useState(null);

  // stores comment to post at bottom of listing
  const [newComment, setNewComment] = useState('');

  const [commentsArray, setCommentsArray] = useState([]);

  // ordered comments array - shows comments from listingDetails in reverse order (newest at top):
  const [orderedComments, setOrderedComments] = useState([]);

  // listing id to use as parameter in GET request below to find specific listing
  const listingId = useParams().listingId;

  // navigate hook to programmatically redirect back to 'Home' component after delete button clicked
  const navigate = useNavigate();

  // instantiating user from useAuthContext hook to be used within the submit handler below
  const { user } = useAuthContext();

  //----------------------------------------------------------------------
  // ORDER COMMENTS

  const handleOrderComments = (commentsArray) => {
    const unorderedArray = commentsArray;

    if (unorderedArray.length > 0) {
      const orderedArray = unorderedArray.reverse();
      setOrderedComments(orderedArray);
    }
  };

  //----------------------------------------------------------------------
  // DELETE LISTING REQUEST

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
      navigate('/home');
    }
    if (!response.ok) {
      console.log('response not ok');
    }
  };

  //----------------------------------------------------------------------
  // ADD COMMENT REQUEST

  const handleSubmit = async (event) => {
    event.preventDefault();

    // we first want to check and see if there is even a user logged in else we won't bother with the rest of the function
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:4000/listings/${listingId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ message: newComment }),
      }
    );

    const json = await response.json();

    // if response NOT ok then show error in database
    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyFields);
      console.log(error);
    }

    if (response.ok) {
      setListingDetails(json);
      setCommentsArray(json.comments);
      // setEmptyFields([]);
      // setError(null);
      setNewComment('');
    }
  };

  //----------------------------------------------------------------------
  // DELETE REQUEST TO DELETE COMMENTS

  const handleCommentDelete = async (commentId) => {
    console.log('clicked');

    // we first want to check and see if there is even a user logged in else we won't bother with the rest of the function
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:4000/listings/${listingId}/comments/${commentId}`,
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
      setCommentsArray(json.comments);
    }
    if (!response.ok) {
      console.log('response not ok');
    }
  };

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
        setCommentsArray(json.comments);
      }
    };

    if (user) {
      fetchListingDetails(listingId);
    }
  }, [user]);

  //----------------------------------------------------------------------
  return (
    <div className='listing-details'>
      <div className='listing-details__top-nav'>
        <Link to='/home'>
          <button>Go Back</button>
        </Link>
      </div>

      {listingDetails && listingDetails ? (
        <div className='listing'>
          <header className='listing-header'>
            <div className={user.userId === listingDetails.author._id ? "listing-header__buttons" : "hide"}>
              <button>Edit</button>
              <button>Delete</button>
            </div>
            <figure className='listing-header__img'>
              <img src={listingDetails.image} alt='uploaded image of produce' />
            </figure>
            <div className='listing-header__name'>
              <h1>{listingDetails.name}</h1>
            </div>
            <div className='listing-header__exchange'>
              <p>Exchanging for:</p>
              <p>{listingDetails.exchange}</p>
            </div>
          </header>
          <main className='listing-body'>
            <p className='listing-body__description'>
              {listingDetails.description}
            </p>
            <p className='listing-body__author'>
              Listed by: {listingDetails.author.firstName}
            </p>
            <p
              className={
                listingDetails.exchangeDescription
                  ? 'listing-body__exchange-description'
                  : 'hide'
              }
            >
              Exchange description: {listingDetails.exchangeDescription}
            </p>
          </main>
          <footer className='listing-footer'>
            <div className='listing-footer__quantity'>
              <p>Quantity</p>
              <p>{listingDetails.quantity}</p>
            </div>
            <div className='two-column'>
              <div className='listing-footer__location'>
                <p>{listingDetails.location}</p>
              </div>
              <div className="line"></div>
              <div className='listing-footer__pickup-time'>
                <p>{listingDetails.pickup}</p>
              </div>
            </div>
          </footer>
        </div>
      ) : null}

      {listingDetails && listingDetails.author === user.userId ? (
        <div>
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

      <h2>Comments</h2>
      {commentsArray &&
        commentsArray.map((comment) => {
          return (
            <div key={comment._id}>
              <p>Author: {comment.author.firstName}</p>
              <p>message: {comment.message}</p>
              <p>Posted at: {comment.createdAt}</p>
              <button>Delete Comment</button>
            </div>
          );
        })}

      <div>
        <form onSubmit={handleSubmit}>
          <textarea
            cols='30'
            rows='10'
            onChange={(event) => setNewComment(event.target.value)}
            name='comment'
            id='comment'
            value={newComment}
          ></textarea>
          <button type='submit'>Leave comment</button>
        </form>
      </div>
    </div>
  );
};

export default ListingDetails;
