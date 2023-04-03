// HOOKS
import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';


// STYLE SHEET
import './AddListing.scss';

const AddListingDetails = () => {
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
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  // navigate hook to programmatically redirect back to 'Home' component after submit button clicked
  const navigate = useNavigate();

 // ----------------------------------------------------------------------

 
  //----------------------------------------------------------------------
  // POST REQUEST ON FORM SUBMIT - Add a new listing to database
   
  const handleSubmit = async (event) => {
    event.preventDefault();
   
 let userImage = await toBase64(image);
    const file = { file: userImage }
    
    
    const listing = {
      exchange,
      exchangeDescription,
      name,
      file,
      description,
      quantity,
      location,
      pickup,
    };

    const response = await fetch('http://localhost:4000/listings', {
      method: 'POST',
      body: JSON.stringify(listing),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    // if response NOT ok then show error in database
    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyFields);
      console.log(error);
    }
    // if response OK then this will reset the inputs to empty to add another and set the error to null
    if (response.ok) {
      setExchange('');
      setExchangeDescription('');
      setName('');
      setDescription('');
      setQuantity('');
      setLocation('');
      setPickup('');
      setImage('')
      // setEmptyFields([]);
      setError(null);
      navigate('/home/');
    }
  };

  //----------------------------------------------------------------------
  // CALL BACK FUNCTIONS FOR ITEM CATEGORY

  // finds the chosen category
  const handleExchangeCategory = (event) => {
    const value = event.target.value
    setExchange(value);
    if (value === 'free') {setExchangeDescription('')} 
  };

  // saves the description for the exchange
  const handleExchangeDescription = (event) => {
    setExchangeDescription(event.target.value);

  };


    //----------------------------------------------------------------------
  // CALL BACK FUNCTIONS FOR IMAGE UPLOAD
  const fileChangeHandler = (event) => {
    event.preventDefault();
    const image = event.target.files[0]

    if (!image) {
      alert('choose image')
    }
    
    if (image) {
      setImage(image)
      // console.log(image)

      const imgUrl = URL.createObjectURL(image);
      setImagePreview(imgUrl);
    }
  }

   // upload image file
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  



  //----------------------------------------------------------------------

  return (
    <div>
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

      <form onSubmit={handleSubmit} >
            
    {/* upload image section */}
        <label htmlFor='image'> Upload Image</label>
        <input
          onInput={(e) => fileChangeHandler(e)}
          type="file"
          name='image'
        id='image'
        accept='.jpeg, .png, .jpg'
           />
    {/* conditional rendering of image thumbnail */}
          {image ? (
            <div className="image-thumbnail">
              <img src={imagePreview} alt="" />
            </div>
          ) : null}

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

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddListingDetails;
