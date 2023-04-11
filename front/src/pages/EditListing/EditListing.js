// HOOKS
import { useState, useEffect, React } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
// import { useListingsContext } from '../../hooks/useListingsContext';

// COMPONENTS
import ImageUpload from '../../components/listing-form/ImageUpload';
import ExchangeCategory from '../../components/listing-form/ExchangeCategory';
import ListingName from '../../components/listing-form/ListingName';
import ListingDescription from '../../components/listing-form/ListingDescription';
import ListingQuantity from '../../components/listing-form/ListingQuantity';
import ListingLocation from '../../components/listing-form/ListingLocation';
import ListingPickup from '../../components/listing-form/ListingPickup';
import BackNav from '../../components/back-nav/BackNav';

// STYLE SHEET
import './EditListing.scss';

const EditListing = () => {
  //----------------------------------------------------------------------
  // USE STATES & GLOBAL VARIABLES

  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [exchange, setExchange] = useState('');
  const [exchangeDescription, setExchangeDescription] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [pickup, setPickup] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // navigate hook to programmatically redirect back to 'Home' component after update button clicked
  const navigate = useNavigate();

  // listing id to use as parameter in GET request below to find specific listing
  const listingId = useParams().listingId;

  //-----------------------------------------------------------------------------
  // USE CONTEXT

  // instantiating user from useAuthContext hook to be used within the submit handler below
  const { user } = useAuthContext();

  // instantiating the dispatch function from the useListingsContext hook to update the global state to match DB when new listing document is created
  // const { dispatch } = useListingsContext();

  //----------------------------------------------------------------------
  // GET REQUEST WITH SPECIFIC ID TO DATABASE ON PAGE LOAD

  useEffect(() => {
    const fetchListingDetails = async (listingId) => {
      const response = await fetch(
        `http://localhost:4000/listings/${listingId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setImage(json.image);
        setExchange(json.exchange);
        setExchangeDescription(json.exchangeDescription);
        setName(json.name);
        setDescription(json.description);
        setQuantity(json.quantity);
        setLocation(json.location);
        setPickup(json.pickup);
      }
    };

    if (user) {
      fetchListingDetails(listingId);
    }
  }, [user]);

  //----------------------------------------------------------------------
  // PUT REQUEST TO EDIT SPECIFIC LISTING WITHIN THE DATABASE ON PAGE LOAD

  const handleUpdate = async (event) => {
    event.preventDefault();

    // we first want to check and see if there is even a user logged in else we won't bother with the rest of the function
    if (!user) {
      setError('You must be logged in');
      return;
    }

    const listing = {
      exchange,
      exchangeDescription,
      name,
      description,
      quantity,
      location,
      pickup,
    };

    console.log(listing);

    const response = await fetch(
      `http://localhost:4000/listings/${listingId}`,
      {
        method: 'PUT',
        body: JSON.stringify(listing),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    // if response NOT ok then show error in database
    if (!response.ok) {
      setError(json.error);
      console.log(error);
    }

    // if response OK then navigate back to listing and set the error to null
    if (response.ok) {
      setError(null);
      navigate(`/listings/${listingId}`);
    }
  };

  //----------------------------------------------------------------------
  // CALLBACK FUNCTIONS FOR IMAGE UPLOAD

  const fileChangeHandler = function (event) {
    // save image uploaded by user in constant
    const image = event.target.files[0];

    // if no image, prompt user
    if (!image) {
      alert('choose image');
    }

    // if there is an image, save this in image useState, create an image url and save this in imageUrl useState
    if (image) {
      setImage(image);
      const imgUrl = URL.createObjectURL(image);
      setImagePreview(imgUrl);
    }
  };

  // upload image file (used in post request)
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  //----------------------------------------------------------------------
  // CALLBACK FUNCTIONS FOR ITEM CATEGORY (So exchange description r

  // finds the chosen category
  const handleExchangeCategory = function (event) {
    const value = event.target.id;
    setExchange(value);
    if (value === 'free') {
      // refreshes if the exchangeDescription useState if free category is chosen
      setExchangeDescription('');
    }
  };

  // saves the description for the exchange
  const handleExchangeDescription = function (event) {
    const newDescription = event.target.value;
    setExchangeDescription(newDescription);
  };

  //----------------------------------------------------------------------

  return (
    <div className='edit-listing'>
      <header className='edit-listing-header'>
        <BackNav />
      </header>

      <main className='edit-listing-body'>
        <form  className="listing-form" onSubmit={handleUpdate}>

          <ImageUpload 
          fileChangeHandler={fileChangeHandler}
          image={image}
          imagePreview={imagePreview}
          emptyFields={emptyFields}
           />

          <ExchangeCategory
            handleExchangeCategory={handleExchangeCategory}
            handleExchangeDescription={handleExchangeDescription}
            exchange={exchange}
            exchangeDescription={exchangeDescription}
          />

          <ListingName setName={setName} name={name} />

          <ListingDescription
            setDescription={setDescription}
            description={description}
          />

          <ListingQuantity setQuantity={setQuantity} quantity={quantity} />

          <ListingLocation setLocation={setLocation} location={location} />

          <ListingPickup setPickup={setPickup} pickup={pickup} />

          {/* Output the error message to user at bottom of form if not all fields are filled out */}
          {error && <div className='error'>{error}</div>}
          <button type='submit'>Update</button>
        </form>
      </main>
    </div>
  );
};

export default EditListing;
