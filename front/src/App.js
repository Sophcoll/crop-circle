import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import Landing from './pages/Landing/Landing';
import Navbar from './components/navbar/Navbar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import NotFound from './pages/errors/NotFound';
import AddListingDetails from './pages/AddListing/AddListingDetails';
import AddListingCategory from './pages/AddListing/AddListingCategory';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Navbar />
        <div className="pages">
          <Routes>
             <Route path='/' element={ <Landing />} />
             <Route path='/login' element={ <Login />} />
             <Route path='/signup' element={ <Signup />} />
             <Route path='/home' element={<Home />}/> 
             <Route path='/list/item-category' element={ <AddListingCategory />} />
             <Route path='/list/item-details' element={ <AddListingDetails />} />
             <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
