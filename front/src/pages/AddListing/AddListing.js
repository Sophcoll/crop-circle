// HOOKS
import { useState, React } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useListingsContext } from '../../hooks/useListingsContext';

// STYLE SHEET
import './AddListing.scss';

const AddListing = () => {
  //----------------------------------------------------------------------
  // USE STATES

  // for item category (maybe needs to be on a separate page)
  const [exchange, setExchange] = useState('');
  const [exchangeDescription, setExchangeDescription] = useState('');

  // for item-details
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [pickup, setPickup] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // navigate hook to programmatically redirect back to 'Home' component after submit button clicked
  const navigate = useNavigate();

  // console.log(emptyFields);

  //-----------------------------------------------------------------------------
  // USE CONTEXT

  // instantiating user from useAuthContext hook to be used within the submit handler below
  const { user } = useAuthContext();

  // instantiating the dispatch function from the useListingsContext hook to update the global state to match DB when new listing document is created
  const { dispatch } = useListingsContext();

  //----------------------------------------------------------------------
  // POST REQUEST ON FORM SUBMIT - Add a new listing to database

  const handleSubmit = async (event) => {
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

    const response = await fetch(`http://localhost:4000/listings`, {
      method: 'POST',
      body: JSON.stringify(listing),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    // if response NOT ok then show error in database
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      console.log(error);
    }
    // if response OK then this will reset the inputs to empty to add another and set the error to null
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
      dispatch({ type: 'CREATE_LISTING', payload: json }); // update the global state to match the db
      navigate('/home/');
    }
  };

  //----------------------------------------------------------------------
  // CALL BACK FUNCTIONS FOR ITEM CATEGORY

  // finds the chosen category
  const handleExchangeCategory = (event) => {
    const value = event.target.value;
    setExchange(value);
    if (value === 'free') {
      setExchangeDescription('');
    }
  };

  // saves the description for the exchange
  const handleExchangeDescription = (event) => {
    setExchangeDescription(event.target.value);
  };

  //----------------------------------------------------------------------

  return (
    <div>
      <Link to={'/home'}>
        <button>back</button>
      </Link>
      <form>
        <div>
          <input
            onChange={handleExchangeCategory}
            type='radio'
            id='free'
            name='exchange'
            value='free'
          />
          <label htmlFor='free'>Free</label>
        </div>
        <div>
          <input
            onChange={handleExchangeCategory}
            type='radio'
            id='labour'
            name='exchange'
            value='labour'
          />
          <label htmlFor='labour'>Labour</label>
          <textarea
            onChange={handleExchangeDescription}
            className={exchange === 'labour' ? '' : 'hide'}
            name='labourDescription'
            id='labourDescription'
            cols='30'
            rows='10'
          ></textarea>
        </div>
        <div>
          <input
            onChange={handleExchangeCategory}
            type='radio'
            id='produce'
            name='exchange'
            value='produce'
          />
          <label htmlFor='produce'>Other produce</label>
          <textarea
            onChange={handleExchangeDescription}
            className={exchange === 'produce' ? '' : 'hide'}
            name='produceDescription'
            id='produceDescription'
            cols='30'
            rows='10'
          ></textarea>
        </div>
      </form>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type='text'
          onChange={(event) => setName(event.target.value)}
          value={name}
          className={emptyFields && emptyFields.includes('name') ? 'error' : ''}
        />

        <label>Description</label>
        <input
          type='text'
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          className={
            emptyFields && emptyFields.includes('description') ? 'error' : ''
          }
        />

        <label>Quantity</label>
        <input
          type='text'
          onChange={(event) => setQuantity(event.target.value)}
          value={quantity}
          className={
            emptyFields && emptyFields.includes('quantity') ? 'error' : ''
          }
        />

        <label>Approx Location</label>
        <input
          type='text'
          onChange={(event) => setLocation(event.target.value)}
          value={location}
          className={
            emptyFields && emptyFields.includes('location') ? 'error' : ''
          }
        />

        <label>Pick-up times</label>
        <input
          type='text'
          onChange={(event) => setPickup(event.target.value)}
          value={pickup}
          className={
            emptyFields && emptyFields.includes('pickup') ? 'error' : ''
          }
        />

        <button>Submit</button>
        {/* Output the error message to user at bottom of form if not all fields are filled out */}
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default AddListing;
