// HOOKS
import { useAuthContext } from '../../hooks/useAuthContext';

// STYLE SHEET
import './Listing.scss';

const Listing = ({ listingDetails, handleDelete }) => {
  //----------------------------------------------------------------------
  // USE CONTEXT

  // instantiating user from useAuthContext hook to be used within the submit handler below
  const { user } = useAuthContext();

  //----------------------------------------------------------------------
  return (
    <>
      {listingDetails && listingDetails ? (
        <div className='listing'>
          <header className='listing-header'>
            <div
              className={
                user.userId === listingDetails.author._id
                  ? 'listing-header__buttons'
                  : 'hide'
              }
            >
              <button>Edit</button>
              <button onClick={handleDelete}>Delete</button>
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
              <div className='line'></div>
              <div className='listing-footer__pickup-time'>
                <p>{listingDetails.pickup}</p>
              </div>
            </div>
          </footer>
        </div>
      ) : null}
    </>
  );
};

export default Listing;
