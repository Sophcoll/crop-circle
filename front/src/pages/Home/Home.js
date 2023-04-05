// HOOKS
import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useListingsContext } from '../../hooks/useListingsContext';
import Navbar from '../../components/navbar/Navbar';

const Home = () => {
  //----------------------------------------------------------------------
  // USE STATE

  const [listings, setListings] = useState(null);

  //-----------------------------------------------------------------------------
  // HOOK
  // instantiating user from the useAuthContext hook to access user and use in the 'Authorization' header of GET request
  const { user } = useAuthContext();

  // instantiating the dispatch function from the useListingsContext hook - we need to set the initial global state so it's not null
  const { dispatch } = useListingsContext();

  //----------------------------------------------------------------------
  // GET REQUEST TO DATABASE ON PAGE LOAD

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch('http://localhost:4000/listings/', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setListings(json);
        dispatch({ type: 'SET_LISTINGS', payload: json }); // set the initial global state so it's not null & to match the db
      }
    };
    if (user) {
      fetchListings();
    }
  }, [dispatch, user]);

  //----------------------------------------------------------------------
  return (
    <div>
      <Navbar />
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
                  <p>Listed by</p>
                </li>
              </Link>
            );
          })}
      </ul>
      <Link to='/list/item-details'>
        <button>Add Listing</button>
      </Link>
    </div>
  );
};

export default Home;
