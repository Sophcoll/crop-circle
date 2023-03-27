import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages and components
import Home from "./pages/Home/Home";
import Navbar from "./components/navbar/Navbar"
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import NotFound from "./pages/errors/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Navbar />
        <div className="pages">
          <Routes>
             <Route path='/' element={ <Home />} />
             <Route path='/login' element={ <Login />} />
             <Route path='/signup' element={ <Signup />} />
             <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
