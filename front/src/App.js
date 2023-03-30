import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { React} from 'react'

// pages and components
import Landing from './pages/Landing/Landing';
import Navbar from './components/navbar/Navbar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import NotFound from './pages/errors/NotFound';
import AddListingDetails from './pages/AddListing/AddListingDetails';
import AddListingCategory from './pages/AddListing/AddListingCategory';
import Home from './pages/Home/Home';
import ListingDetails from './pages/ListingDetails/ListingDetails';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
             <Route path='/' element={ <Landing />} />
             <Route path='/login' element={ <Login />} />
             <Route path='/signup' element={ <Signup />} />
             <Route path='/home' element={<Home />}/> 
              <Route path='/menu' element={<Menu />} />
             <Route path='/list/item-category' element={ <AddListingCategory />} />
             <Route path='/list/item-details' element={ <AddListingDetails />} />
             <Route path='/listings/:i' element={ <ListingDetails />} />
             <Route path="*" element={<NotFound/>} />
             
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
