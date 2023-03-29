// HOOKS
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Home = () => {

  //----------------------------------------------------------------------
  // USE STATES & GLOBAL VARIABLES

  const [listings, setListings] = useState(null);

  //----------------------------------------------------------------------
  // GET REQUEST TO DATABASE ON PAGE LOAD
  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch("http://localhost:4000/listings/");
      const json = await response.json();

      if (response.ok) {
        setListings(json);
      }
    };
    fetchListings();
  }, []);


  //----------------------------------------------------------------------
  return (
    <div>
      <ul>
      {listings &&
          listings.map((listing) => {
            return (
              <Link
                to={`/listings/${listing._id}`}
                state={listing}
                key={listing._id}
              >
                <li>
                  <h2>{listing.name}</h2>
                  {/* <h2>{listing.exchange}</h2> */}
                </li>
              </Link>
            );
          })}
      </ul>
    </div>
  );
};

export default Home;

