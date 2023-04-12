// HOOKS
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { React } from 'react';
import { useAuthContext } from './hooks/useAuthContext';

// COMPONENTS
import Landing from './pages/Landing/Landing';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import NotFound from './pages/errors/NotFound';
import AddListing from './pages/AddListing/AddListing';
import Home from './pages/Home/Home';
import ListingDetails from './pages/ListingDetails/ListingDetails';
import Menu from './pages/Menu/Menu';
import EditListing from './pages/EditListing/EditListing';
import Profile from './pages/Profile/Profile';
import Confirmation from './pages/Confirmation.js/Confirmation';

function App() {
  // instantiate user from AuthContext so we can protect routes from people not logged in & redirect a user based on their authentication status
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={!user ? <Landing /> : <Navigate to='/home' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/home' />}
            />
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/home" />} />
            <Route path='/confirmation' element={ <Confirmation />} />
            <Route
              path='/home'
              element={user ? <Home /> : <Navigate to='/' />}
            />
            <Route path='/menu' element={<Menu />} />
            <Route path='/menu/profile' element={<Profile />} />
            <Route path='/list/item-details' element={<AddListing />} />
            <Route path='/listings/:listingId' element={<ListingDetails />} />
            <Route path='/listings/:listingId/edit' element={<EditListing />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
