// HOOKS
import { useState, useEffect, React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// COMPONENTS
import Listing from '../../components/listing/Listing';
import CommentSection from '../../components/comments/CommentSection';
import BackNav from '../../components/back-nav/BackNav';
import Circle from '../../components/circle/Circle';

// STYLE SHEET
import './ListingDetails.scss';

const ListingDetails = () => {
  //----------------------------------------------------------------------
  // USE STATES, USE CONTEXT & USE PARAMS

  const [listingDetails, setListingDetails] = useState(null);
  const [authorDetails, setAuthorDetails] = useState({});
  const [commentsArray, setCommentsArray] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const listingId = useParams().listingId;
  const navigate = useNavigate();

  const pageTitle = 'Listing details';

  //----------------------------------------------------------------------
  // GET A SPECIFIC LISTING REQUEST

  useEffect(() => {
    const fetchListingDetails = async function (listingId) {
      // GET request using listing id value from useParams & user authentication token
      const response = await fetch(
        `http://localhost:4000/listings/${listingId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // await response and store as json
      const json = await response.json();

      // if response is ok update the listingDetails useState and populate the commentsArray useState
      if (response.ok) {
        setListingDetails(json);
        setAuthorDetails({ name: json.author.firstName, id: json.author._id });
        setCommentsArray(json.comments);
      }
    };

    // only invoke this function if there is a user logged in
    if (user) {
      fetchListingDetails(listingId);
    }
  }, [user, commentsArray]);

  //----------------------------------------------------------------------
  // DELETE A SPECIFIC LISTING REQUEST

  const handleDelete = async function () {
    // check for a logged in user before executing request
    if (!user) {
      return;
    }

    // DELETE request using listingId from useParams in route & user authentication token
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

    // await response and store as json
    const json = await response.json();

    // if the response is not ok, output the error in the console
    if (!response.ok) {
      console.log('response not ok');
    }

    // if response is ok update the listingDetails useState and redirect back to the home page
    if (response.ok) {
      setListingDetails(json);
      navigate('/home/');
    }
  };

  //----------------------------------------------------------------------
  // POST COMMENT REQUEST

  const handleSubmit = async (event) => {
    // stop default page refresh on form submit
    event.preventDefault();

    // check for a logged in user before executing request
    if (!user) {
      return;
    }

    // POST request with user authentication token
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

    // await response and store as json
    const json = await response.json();

    // if the response is not ok, output the error in the console & front end UI
    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyFields);
      console.log(error);
    }

    // if response is ok update the listingDetails useState, commentsArray useState and reset the newComment useState ready for the next comment
    if (response.ok) {
      setListingDetails(json);
      setCommentsArray(json.comments);
      // setEmptyFields([]);
      // setError(null);
      setNewComment('');
    }
  };

  //----------------------------------------------------------------------
  // DELETE COMMENT REQUEST
  const handleCommentDelete = async (commentId) => {
    console.log('clicked');

    // check for a logged in user before executing request
    if (!user) {
      return;
    }

    // DELETE request with listingId from useParams, commentId passed in as an argument & user authentication token
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

    // await response and store as json
    const json = await response.json();

    // if the response is not ok, output the error in the console
    if (!response.ok) {
      console.log('response not ok');
    }

    // if response is ok update the listingDetails & commentsArray useStates
    if (response.ok) {
      setListingDetails(json);
      setCommentsArray(json.comments);
    }
  };

  //----------------------------------------------------------------------
  return (
    <div className='listing-details'>
      <header className='listing-details-header'>
        <BackNav />
      </header>

      <main className='listing-details-body'>
        <div className='column-left'>
          <Circle pageTitle={pageTitle} />
        </div>

        <div className='column-right'>
          <Listing
            authorDetails={authorDetails}
            listingDetails={listingDetails}
            handleDelete={handleDelete}
          />
          <CommentSection
            commentsArray={commentsArray}
            handleCommentDelete={handleCommentDelete}
            newComment={newComment}
            setNewComment={setNewComment}
            handleSubmit={handleSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default ListingDetails;
