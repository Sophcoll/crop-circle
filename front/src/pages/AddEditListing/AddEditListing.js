// HOOKS
import { useState, React, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// COMPONENTS
import ImageUpload from '../../components/listing-form/ImageUpload';
import ExchangeCategory from '../../components/listing-form/ExchangeCategory';
import ListingName from '../../components/listing-form/ListingName';
import ListingDescription from '../../components/listing-form/ListingDescription';
import ListingQuantity from '../../components/listing-form/ListingQuantity';
import ListingLocation from '../../components/listing-form/ListingLocation';
import ListingPickup from '../../components/listing-form/ListingPickup';
import BackNav from '../../components/back-nav/BackNav';
import Circle from '../../components/circle/Circle';

// STYLE SHEET
import "../MainPage.scss";

const AddEditListing = () => {
  //----------------------------------------------------------------------

  /* This page has two modes: create or edit. This mode is determined by the state data object (referred to as the editStatus) 
  that is passed to the AddEditListing component, through whichever react-router-link that user has clicked on in order to navigate to this page.

  If the user accesses this AddEditListing component from the 'List an Item' button on the Home page component, the editStatus object will contain 
  a listingId key with a value of 'null', thus this component will be in create mode. 

  If the user accesses this AddEditListing component from the 'edit' button whilst viewing a specific listing, the editStatus object will contain 
  a listingId key with the value of the listing id, thus this component will be in edit mode. */

  //----------------------------------------------------------------------
  // USE STATES, USE CONTEXT & USE NAVIGATE

  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [file, setFile] = useState(null);
  const [exchange, setExchange] = useState('');
  const [exchangeDescription, setExchangeDescription] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [pickup, setPickup] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { user } = useAuthContext();

  // had to label as reactLocation because we have used location already above
  const reactLocation = useLocation();

  // allows us to access the state being passed in through the react router links from other components
  const editStatus = reactLocation.state;

  // programmatically navigate to another page after request response is ok
  const navigate = useNavigate();

  // passed to circle component to render page title conditionally based on whether page is in create or edit mode
  const pageTitle = editStatus.listingId ? 'Edit listing' : 'List some produce';

  //----------------------------------------------------------------------
  // GET SPECIFIC LISTING INFORMATION IF IN EDIT MODE

  useEffect(() => {
    const fetchListingDetails = async (id) => {
      const response = await fetch(`http://localhost:4000/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
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

    if (user && editStatus.listingId) {
      const id = editStatus.listingId;
      fetchListingDetails(id);
    }
  }, [user, editStatus.listingId]);

  //----------------------------------------------------------------------
  // POST A NEW LISTING REQUEST / PUT (EDIT) AN EXISTING LISTING

  //Request changes conditionally based on the mode

  const handleSubmit = async function (event) {
    // stop default page refresh on form submit
    event.preventDefault();

    // check for a logged in user before executing request
    if (!user) {
      setError('You must be logged in');
      return;
    }

    // image upload - MOVED THIS INTO A CALL BACK FUNCTION BELOW 
    // let userImage = await toBase64(image);
    // const file = { file: userImage };

    // define what will be sent in request body
    const listing = {
      exchange,
      exchangeDescription,
      name,
      description,
      quantity,
      location,
      pickup,
      file,
    };

    // POST or PUT request with user authentication token
    const response = await fetch(
      `http://localhost:4000/listings/${
        editStatus.listingId ? editStatus.listingId : ''
      }`,
      {
        method: editStatus.listingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(listing),
      }
    );
    const json = await response.json();

    // if the response is not ok, output the error in the console & on front UI
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(error);
    }

    // if response is ok, update or reset the appropriate useStates, update the global listingsContext & redirect home
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setExchange('');
      setExchangeDescription('');
      setName('');
      setDescription('');
      setQuantity('');
      setLocation('');
      setPickup('');
      setImage('');
      editStatus.listingId
        ? navigate(`/listings/${editStatus.listingId}`)
        : navigate('/home');
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

      handleCreateFile(image)
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

  const handleCreateFile = async function (image) {
    let userImage = await toBase64(image);
    const file = { file: userImage };

    setFile(file);
  };

  //----------------------------------------------------------------------
  // CALLBACK FUNCTIONS FOR ITEM CATEGORY

  // This is a call back function rather than inline, because we need the exchange description to be reset to an empty string if the chosen exchange category is 'free'

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
    <div className='main-page'>
      <header className='main-page__header'>
        <BackNav />
      </header>

      <main className='main-page__body'>
        <div className='column-left'>
          <Circle pageTitle={pageTitle} />
        </div>

        <div className='column-right padding-small'>
          <form className='listing-form' onSubmit={handleSubmit}>
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
              emptyFields={emptyFields}
            />

            <ListingName
              setName={setName}
              name={name}
              emptyFields={emptyFields}
            />

            <ListingDescription
              setDescription={setDescription}
              description={description}
              emptyFields={emptyFields}
            />

            <ListingQuantity
              setQuantity={setQuantity}
              quantity={quantity}
              emptyFields={emptyFields}
            />

            <ListingLocation
              setLocation={setLocation}
              location={location}
              emptyFields={emptyFields}
            />

            <ListingPickup
              setPickup={setPickup}
              pickup={pickup}
              emptyFields={emptyFields}
            />

            {/* Output the error message to user at bottom of form if not all fields are filled out */}
            <button type='submit'>
              {editStatus.listingId ? 'Update' : 'Submit'}
            </button>
            {error && <div className='error-message'>{error}</div>}
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddEditListing;
