// HOOKS
import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useListingsContext } from '../../hooks/useListingsContext';

// COMPONENTS
import Logo from '../../components/logo/Logo';
import FilterButtons from '../../components/filter-buttons/FilterButtons';
import Circle from '../../components/circle/Circle';
import ListingsListView from '../../components/listings-list-view/ListingsListView';

// STYLE SHEET
import './Home.scss';

const Home = () => {
  //----------------------------------------------------------------------
  // USE STATE, USE CONTEXT & GLOBAL VARIABLES

  const [listings, setListings] = useState(null);

  const { user } = useAuthContext();
  const { dispatch } = useListingsContext();

  // values used by filter button components
  const filterOptions = ['all', 'free', 'labour', 'exchange'];

  // feeds the circle component title for the page
  const pageTitle = 'produce nearby';

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

  const editListing = false;

  const myData = {
    listingId: null
  }

  //----------------------------------------------------------------------
  return (
    <div className='home'>
      <header className='home-header'>
        <Logo />
        <FilterButtons filterOptions={filterOptions} />
      </header>

      <main className='home-body'>
        <Circle pageTitle={pageTitle} />
        <ListingsListView listings={listings} />
      </main>

      <footer className='home-footer'>
        <Link to='/menu'>
          <button>Menu</button>
        </Link>
        <span className='line'></span>
        <Link to='/list/item-details' state={myData} >
          <button>List an item</button>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
