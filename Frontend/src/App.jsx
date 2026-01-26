import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Pages/Login'
import Signup from './Components/Pages/Signup'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import SelectedRestaurant from './Components/SelectedRestaurant'
import ProtectedRoute from "./Components/ProtectedRoute";
import About from './Components/Pages/About'
import Contact from './Components/Pages/Contact'
import Footer from './Components/Footer'
import TopBrands from './Components/TopBrands'
// import Cart from './Components/Cart'
// import FoodItem from './Components/FoodItem'

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/home' element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
              } />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/selectedRestaurant/:id' element={<SelectedRestaurant />} />
        </Routes>
      </Router>
              <TopBrands/>
      {/* <FoodItem name="Burger" price= "80" description= "This is a veg burger" qty="1" /> */}
      {/* <Cart/> */}
      <Footer/>
    </>
  )
}

export default App