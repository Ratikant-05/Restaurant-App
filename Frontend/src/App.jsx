import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom' 
import Navbar from './Components/Navbar'
import Login from './Components/Pages/Login'
import Signup from './Components/Pages/Signup'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import SelectedRestaurant from './Components/Pages/SelectedRestaurant'
import Footer from './Components/Footer'
import TopBrands from './Components/TopBrands'

function App() {

  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element= {<Login/>} />
        <Route path='/signup' element= {<Signup/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/selectedRestaurant/:id' element={<SelectedRestaurant/>}/>
      </Routes>
    </Router>
    <TopBrands/>
    <Footer/>
    {/* offers for you */}
    {/* restuarants one by one with infinite scroll */}
    </>
  )
}

export default App