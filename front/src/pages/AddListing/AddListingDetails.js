// HOOKS
import { useState } from "react";

const AddListingDetails = () => {
  //----------------------------------------------------------------------
  // USE STATES & GLOBAL VARIABLES

  // for item category (maybe needs to be on a separate page)
  const [exchange, setExchange] = useState('');
  const [exchangeDescription, setExchangeDescription] = useState("");

  // for item-details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [pickup, setPickup] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  //----------------------------------------------------------------------
  // POST REQUEST ON FORM SUBMIT - Add a new listing to database

  const handleSubmit = async (event) => {
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

    const response = await fetch("http://localhost:4000/listings", {
      method: "POST",
      body: JSON.stringify(listing),
      headers: {
        "Content-Type": "application/json",
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
      setExchange('');
      setExchangeDescription("");
      setName("");
      setDescription("");
      setQuantity("");
      setLocation("");
      setPickup("");
      setEmptyFields([]);
      setError(null);
    }
  };

  //----------------------------------------------------------------------
  // CALL BACK FUNCTIONS FOR ITEM CATEGORY

  // finds the chosen category
  const handleExchangeCategory = (event) => {
    setExchange(event.target.value);
  };

  // saves the description for the exchange
  const handleExchangeDescription = (event) => {
    exchange === "free"
      ? setExchangeDescription("")
      : setExchangeDescription(event.target.value);
  };

  //----------------------------------------------------------------------

  return (
    <div>
      <form>
        <div>
          <input
            onClick={handleExchangeCategory}
            type="radio"
            id="free"
            name="exchange"
            value="free"
          />
          <label htmlFor="free">Free</label>
        </div>
        <div>
          <input
            onClick={handleExchangeCategory}
            type="radio"
            id="labour"
            name="exchange"
            value="labour"
          />
          <label htmlFor="labour">Labour</label>
          <textarea
            onChange={handleExchangeDescription}
            className={exchange === "labour" ? "" : "hide"}
            name="labourDescription"
            id="labourDescription"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div>
          <input
            onClick={handleExchangeCategory}
            type="radio"
            id="produce"
            name="exchange"
            value="produce"
          />
          <label htmlFor="produce">Other produce</label>
          <textarea
            onChange={handleExchangeDescription}
            className={exchange === "produce" ? "" : "hide"}
            name="produceDescription"
            id="produceDescription"
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </form>


      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />

        <label>Description</label>
        <input
          type="text"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />

        <label>Quantity</label>
        <input
          type="text"
          onChange={(event) => setQuantity(event.target.value)}
          value={quantity}
        />

        <label>Approx Location</label>
        <input
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          value={location}
        />

        <label>Pick-up times</label>
        <input
          type="text"
          onChange={(event) => setPickup(event.target.value)}
          value={pickup}
        />

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddListingDetails;
