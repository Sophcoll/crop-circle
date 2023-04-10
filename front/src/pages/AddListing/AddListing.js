// HOOKS
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useListingsContext } from '../../hooks/useListingsContext';

// COMPONENTS
import ImageUpload from '../../components/add-listing-form/ImageUpload';
import ExchangeCategory from '../../components/add-listing-form/ExchangeCategory';
import ListingName from '../../components/add-listing-form/ListingName';
import ListingDescription from '../../components/add-listing-form/ListingDescription';
import ListingQuantity from '../../components/add-listing-form/ListingQuantity';
import ListingLocation from '../../components/add-listing-form/ListingLocation';
import ListingPickup from '../../components/add-listing-form/ListingPickup';
import BackNav from '../../components/back-nav/BackNav';

// STYLE SHEET
import './AddListing.scss';

const AddListing = () => {
  //----------------------------------------------------------------------
  // USE STATES, USE CONTEXT & USE NAVIGATE

  const [exchange, setExchange] = useState('');
  const [exchangeDescription, setExchangeDescription] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [pickup, setPickup] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { user } = useAuthContext();
  const { dispatch } = useListingsContext();

  const navigate = useNavigate();

  //----------------------------------------------------------------------
  // CALLBACK FUNCTIONS FOR ITEM CATEGORY (So exchange description r

  // finds the chosen category
  const handleExchangeCategory = function (event) {
    const value = event.target.value;
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
  // POST A NEW LISTING REQUEST

  const handleSubmit = async function (event) {
    // stop default page refresh on form submit
    event.preventDefault();

    // check for a logged in user before executing request
    if (!user) {
      setError('You must be logged in');
      return;
    }

    // image upload
    let userImage = await toBase64(image);
    const file = { file: userImage };

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

    // POST request with user authentication token
    const response = await fetch(`http://localhost:4000/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(listing),
    });
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
      dispatch({ type: 'CREATE_LISTING', payload: json }); // update the global state to match the db
      navigate('/home/');
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

  return (
    <div className='add-listing'>
      <header className='add-listing-header'>
        <BackNav />
      </header>

      <div className='add-listing-body'>
        <form className='add-listing-form' onSubmit={handleSubmit}>
          <ImageUpload
            fileChangeHandler={fileChangeHandler}
            image={image}
            imagePreview={imagePreview}
          />

          <ExchangeCategory
            handleExchangeCategory={handleExchangeCategory}
            handleExchangeDescription={handleExchangeDescription}
            exchange={exchange}
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
          {error && <div className='error'>{error}</div>}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
