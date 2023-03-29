// HOOKS
import { useState } from "react";
import { Link } from "react-router-dom";

// STYLE SHEET
import "./AddListing.scss";

const AddListingCategory = () => {
  //----------------------------------------------------------------------
  // USE STATES & GLOBAL VARIABLES

    const [exchange, setExchange] = useState({
      free: false,
      labour: false,
      produce: false,
    });

//   const [exchange, setExchange] = useState("");
  const [exchangeDescription, setExchangeDescription] = useState("");

  //------------

  const handleRadio = (event) => {
    setExchange(event.target.value);
    if(event.target.value === "free") {
     setExchange({free: true, labour: false, produce: false});
     setExchangeDescription("");
    } else if (event.target.value === "labour") {
     setExchange({free: false, labour: true, produce: false});
    } else {
     setExchange({free: false, labour: false, produce: true});
    }
  };

  const handleChange = (event) => {
    exchange.free ? setExchangeDescription("") : setExchangeDescription(event.target.value);
  }



  //----------------------------------------------------------------------
  return (
    <div>
      <form>
        <div>
          <input
            onClick={handleRadio}
            type="radio"
            id="free"
            name="exchange"
            value="free"
          />
          <label htmlFor="free">Free</label>
        </div>
        <div>
          <input
            onClick={handleRadio}
            type="radio"
            id="labour"
            name="exchange"
            value="labour"
          />
          <label htmlFor="labour">Labour</label>
          <textarea
            onChange={handleChange}
            className={exchange.labour ? "" : "hide"}
            name="labourDescription"
            id="labourDescription"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div>
          <input
            onClick={handleRadio}
            type="radio"
            id="produce"
            name="exchange"
            value="produce"
          />
          <label htmlFor="produce">Other produce</label>
          <textarea
            onChange={handleChange}
            className={exchange.produce ? "" : "hide"}
            name="produceDescription"
            id="produceDescription"
            cols="30"
            rows="10"  
          ></textarea>
        </div>
      </form>
      <Link to={{pathname: "/list/item-details", state: {exchange}}}>
      <button>Next</button>
      </Link>
    </div>
  );
};

export default AddListingCategory;
