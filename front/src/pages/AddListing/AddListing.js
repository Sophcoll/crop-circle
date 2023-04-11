// HOOKS
import { useState, React, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

const AddListing = () => {
  //----------------------------------------------------------------------
  // USE STATES, USE CONTEXT & USE NAVIGATE

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

  const { user } = useAuthContext();
  // const { dispatch } = useListingsContext();

  const reactLocation = useLocation();
  const data = reactLocation.state;
  const navigate = useNavigate();

  // console.log(data);

  //----------------------------------------------------------------------
  // GET SPECIFIC LISTING INFORMATION IF IN EDIT MODE

  useEffect(() => {
    const fetchListingDetails = async (id) => {
      const response = await fetch(
        `http://localhost:4000/listings/${id}`,
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
        // console.log(json.image)
        
      }
    };

    if (user && data.listingId) {
      const id = data.listingId
      fetchListingDetails(id);
    }
  }, [user, data.listingId]);


  //----------------------------------------------------------------------
  // POST A NEW LISTING REQUEST / PUT (edit) AN EXISTING LISTING 

  // this request will change depending on whether the page is in 'create' or 'edit' mode
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

    // const listingEdit = {
    //   exchange,
    //   exchangeDescription,
    //   name,
    //   description,
    //   quantity,
    //   location,
    //   pickup,
    // };

    // POST or PUT request with user authentication token
    const response = await fetch(`http://localhost:4000/listings/${data.listingId ? data.listingId : ''}`, {
      method: data.listingId ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      // body: data.listingId ? JSON.stringify(listingEdit) : JSON.stringify(listingCreate),
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
      data.listingId ? navigate(`/listings/${data.listingId}`) : navigate("/home")
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
    <div className='add-listing'>
      <header className='add-listing-header'>
        <BackNav />
      </header>

      <div className='add-listing-body'>
        <form className='listing-form' onSubmit={handleSubmit}>
          <ImageUpload
            fileChangeHandler={fileChangeHandler}
            image={image}
            imagePreview={imagePreview}
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
          <button type='submit'>{data.listingId ? "Update" : "Submit"}</button>
          {error && <div className='error-message'>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddListing;
