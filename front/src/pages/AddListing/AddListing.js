// HOOKS
import { useState, React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useListingsContext } from '../../hooks/useListingsContext';

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
        <div className='top-nav'>
          <Link to={'/home'}>
            <button>back</button>
          </Link>
        </div>
      </header>

      <div className='add-listing-body'>
        <form className='add-listing-form' onSubmit={handleSubmit}>
          <div className='add-listing-form__image-upload'>
            {/* upload image section */}
            <label htmlFor='image'> Upload Image</label>
            <input
              onInput={(event) => fileChangeHandler(event)}
              type='file'
              name='image'
              id='image'
              accept='.jpeg, .png, .jpg'
            />
            {/* conditional rendering of image thumbnail */}
            {image ? (
              <div className='image-thumbnail'>
                <img src={imagePreview} alt='user image of produce' />
              </div>
            ) : null}
          </div>

          <div className='add-listing-form__exchange'>
            <p>What would you like for your item?</p>
            <div className='add-listing-form__exchange-type'>
              <input
                onChange={handleExchangeCategory}
                type='radio'
                id='free'
                name='exchange'
                value='free'
              />
              <label htmlFor='free'>Nothing - it's free</label>
            </div>
            <div className='add-listing-form__exchange-type'>
              <input
                onChange={handleExchangeCategory}
                type='radio'
                id='labour'
                name='exchange'
                value='labour'
              />
              <label htmlFor='labour'>
                Labour - a helping hand in the harvest
              </label>
            </div>
            <div className='add-listing-form__exchange-description'>
              <textarea
                placeholder='Please give a brief description, i.e. about 2 hours work to help pick fruit'
                onChange={handleExchangeDescription}
                className={exchange === 'labour' ? '' : 'hide'}
                name='labourDescription'
                id='labourDescription'
                cols='30'
                rows='10'
              />
            </div>
            <div className='add-listing-form__exchange-type'>
              <input
                onChange={handleExchangeCategory}
                type='radio'
                id='produce'
                name='exchange'
                value='produce'
              />
              <label htmlFor='produce'>
                Exchange - trade for other produce
              </label>
            </div>
            <div className='add-listing-form__exchange-description'>
              <textarea
              placeholder='What are you wanting to exchange for? Please provide a brief description'
                onChange={handleExchangeDescription}
                className={exchange === 'produce' ? '' : 'hide'}
                name='produceDescription'
                id='produceDescription'
                cols='30'
                rows='10'
              />
            </div>
          </div>

          <div className='add-listing-form__form-option'>
            <label>Name of produce</label>
            <input
              type='text'
              placeholder='What are you listing?  i.e. apples'
              onChange={(event) => setName(event.target.value)}
              value={name}
              className={
                emptyFields && emptyFields.includes('name') ? 'error' : ''
              }
            />
          </div>

          <div className='add-listing-form__form-option'>
            <label>Description</label>
            <textarea
              placeholder='Please give a brief description of the produce you have to offer'
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              className={
                emptyFields && emptyFields.includes('description')
                  ? 'error'
                  : ''
              }
              name='description'
              id='description'
            />
          </div>

          <div className='add-listing-form__form-option'>
            <label>Quantity</label>
            <input
              placeholder='i.e. 1-2 kilograms, a small bag etc'
              type='text'
              onChange={(event) => setQuantity(event.target.value)}
              value={quantity}
              className={
                emptyFields && emptyFields.includes('quantity') ? 'error' : ''
              }
            />
          </div>

          <div className='add-listing-form__form-option'>
            <label>Pickup Location</label>
            <input
              placeholder='Only use an approx, not an actual address'
              type='text'
              onChange={(event) => setLocation(event.target.value)}
              value={location}
              className={
                emptyFields && emptyFields.includes('location') ? 'error' : ''
              }
            />
          </div>

          <div className='add-listing-form__form-option'>
            <label>Pickup times</label>
            <input
              placeholder='i.e. weekdays after 5pm'
              type='text'
              onChange={(event) => setPickup(event.target.value)}
              value={pickup}
              className={
                emptyFields && emptyFields.includes('pickup') ? 'error' : ''
              }
            />
          </div>
          {/* Output the error message to user at bottom of form if not all fields are filled out */}
          {error && <div className='error'>{error}</div>}
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
