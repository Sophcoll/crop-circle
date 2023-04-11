// HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link, useParams } from 'react-router-dom';

// COMPONENTS
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// STYLE SHEET
import './Listing.scss';

const Listing = ({ authorDetails, listingDetails, handleDelete }) => {
  //----------------------------------------------------------------------
  // USE CONTEXT & USE PARAMS

  // instantiating user from useAuthContext hook to be used within the submit handler below
  const { user } = useAuthContext();
  const listingId = useParams().listingId;

  const myData = {
    listingId: listingId
  }

  

  //----------------------------------------------------------------------
  return (
    <>
      {listingDetails && listingDetails ? (
        <div className='listing'>
          <header className='listing-header'>
            <div
              className={
                user.userId === authorDetails.id
                  ? 'listing-header__buttons'
                  : 'hide'
              }
            >
              <Link
              to="/list/item-details"
              state={myData}
                // to={`/listings/${listingId}/edit`}
                // state={listingDetails}
                // key={listingDetails._id}
              >
                <button>Edit</button>
              </Link>
              <span className='line'></span>
              <button onClick={handleDelete}>Delete</button>
            </div>
            <figure className='listing-header__img'>
              <img src={listingDetails.image} alt='uploaded image of produce' />
            </figure>
            <div className='listing-header__name'>
              <h1>{listingDetails.name}</h1>
              <FavoriteBorderOutlinedIcon className="heart-icon" />
            </div>
          </header>

          <main className='listing-body'>
            <p className='listing-body__exchange'>
              Exchanging for: {listingDetails.exchange}
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
            <p className='listing-body__description'>
              {listingDetails.description}
            </p>
            <p className='listing-body__quantity'>
              Quantity: {listingDetails.quantity}
            </p>
            <p className='listing-body__author'>
              Listed by: {authorDetails.name}
            </p>
          </main>
          <footer className='listing-footer'>
            <div className='two-column'>
              <div className='listing-footer__location'>
                <LocationOnOutlinedIcon />
                <p>Near {listingDetails.location}</p>
              </div>
              <div className='line'></div>
              <div className='listing-footer__pickup-time'>
                <AccessTimeIcon />
                <p>Collect {listingDetails.pickup}</p>
              </div>
            </div>
          </footer>
        </div>
      ) : null}
    </>
  );
};

export default Listing;
