// HOOKS
import { useState, useEffect, React } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

// COMPONENTS
import Logo from '../../components/logo/Logo';
import FilterButtons from '../../components/filter-buttons/FilterButtons';
import Circle from '../../components/circle/Circle';
import ListingsListView from '../../components/listings-list-view/ListingsListView';

// STYLE SHEET
import '../MainPage.scss';

const Home = () => {
  //----------------------------------------------------------------------
  // USE STATE, USE CONTEXT & GLOBAL VARIABLES

  const [listings, setListings] = useState(null);

  const { user } = useAuthContext();

  // values used by filter button components
  const filterOptions = ['all', 'free', 'labour', 'exchange'];

  // feeds the circle component title for the page
  const pageTitle = 'produce nearby';

  // used in Link state below for add listing button - passes a null id so the AddEditListing page knows to go into create mode
  const editStatus = {
    listingId: null,
  };

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
      }
    };
    if (user) {
      fetchListings();
    }
  }, [user]);

  //----------------------------------------------------------------------
  return (
    <div className='main-page'>
      <header className='main-page__header'>
        <Logo />
        <FilterButtons filterOptions={filterOptions} />
      </header>

      <main className='main-page__body'>
        <div className='column-left'>
          <Circle pageTitle={pageTitle} />
        </div>
        <div className='column-right padding-big'>
          <div className='circle-container'>
            <Circle pageTitle={pageTitle} />
          </div>
          <ListingsListView listings={listings} />
        </div>
      </main>

      <footer className='main-page__footer'>
        <Link to='/menu'>
          <button>Menu</button>
        </Link>
        <span className='line'></span>
        <Link to='/list/item-details' state={editStatus}>
          <button>List an item</button>
        </Link>
      </footer>
    </div>
  );
};

export default Home;
