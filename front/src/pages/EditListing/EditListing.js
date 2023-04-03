// HOOKS
import { useState, useEffect, React } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// STYLE SHEET
import '../AddListing/AddListing.scss';

const EditListing = () => {
  //----------------------------------------------------------------------
  // USE STATES & GLOBAL VARIABLES

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
  // const [emptyFields, setEmptyFields] = useState([]);

  // navigate hook to programmatically redirect back to 'Home' component after update button clicked
  const navigate = useNavigate();

  // listing id to use as parameter in GET request below to find specific listing
  const listingId = useParams().listingId;

  //----------------------------------------------------------------------
  // GET REQUEST WITH SPECIFIC ID TO DATABASE ON PAGE LOAD

  useEffect(() => {
    const fetchListingDetails = async (listingId) => {
      const response = await fetch(
        `http://localhost:4000/listings/${listingId}`
      );
      const json = await response.json();

      if (response.ok) {
        setExchange(json.exchange);
        setExchangeDescription(json.exchangeDescription);
        setName(json.name);
        setDescription(json.description);
        setQuantity(json.quantity);
        setLocation(json.location);
        setPickup(json.pickup);
      }
    };

    fetchListingDetails(listingId);
  }, []);

  //----------------------------------------------------------------------
  // PUT REQUEST TO EDIT SPECIFIC LISTING WITHIN THE DATABASE ON PAGE LOAD

  const handleUpdate = async (event) => {
    event.preventDefault();

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
        },
      }
    );

    const json = await response.json();

    // if response NOT ok then show error in database
    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyFields);
      console.log(error);
    }

    // if response OK then navigate back to listing and set the error to null
    if (response.ok) {
      setError(null);
      navigate(`/listings/${listingId}`);
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
      <Link to={`/listings/${listingId}`}>
        <button>Back</button>
      </Link>
      <form>
        <div>
          <input
            onChange={handleExchangeCategory}
            type='radio'
            id='free'
            name='exchange'
            value={exchange}
            checked={exchange === 'free' ? true : false}
          />
          <label htmlFor='free'>Free</label>
        </div>
        <div>
          <input
            onChange={handleExchangeCategory}
            type='radio'
            id='labour'
            name='exchange'
            value={exchange}
            checked={exchange === 'labour' ? true : false}
          />
          <label htmlFor='labour'>Labour</label>
          <textarea
            onChange={handleExchangeDescription}
            className={exchange === 'labour' ? '' : 'hide'}
            name='labourDescription'
            id='labourDescription'
            cols='30'
            rows='10'
            value={exchangeDescription}
          ></textarea>
        </div>
        <div>
          <input
            onChange={handleExchangeCategory}
            type='radio'
            id='produce'
            name='exchange'
            value={exchange}
            checked={exchange === 'produce' ? true : false}
          />
          <label htmlFor='produce'>Other produce</label>
          <textarea
            onChange={handleExchangeDescription}
            className={exchange === 'produce' ? '' : 'hide'}
            name='produceDescription'
            id='produceDescription'
            cols='30'
            rows='10'
            value={exchangeDescription}
          ></textarea>
        </div>
      </form>

      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input
          type='text'
          onChange={(event) => setName(event.target.value)}
          value={name}
        />

        <label>Description</label>
        <input
          type='text'
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />

        <label>Quantity</label>
        <input
          type='text'
          onChange={(event) => setQuantity(event.target.value)}
          value={quantity}
        />

        <label>Approx Location</label>
        <input
          type='text'
          onChange={(event) => setLocation(event.target.value)}
          value={location}
        />

        <label>Pick-up times</label>
        <input
          type='text'
          onChange={(event) => setPickup(event.target.value)}
          value={pickup}
        />

        <button>Update</button>
      </form>
    </div>
  );
};

export default EditListing;
