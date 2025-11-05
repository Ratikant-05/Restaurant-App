import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom' 
import Navbar from './Components/Navbar'
import Login from './Components/Pages/Login'
import Signup from './Components/Pages/Signup'
import About from './Components/Pages/About'
import Features from './Components/Pages/Features'
import Contact from './Components/Pages/Contact'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import PostFoodItem from './Components/AddFoodItem'


function App() {

  return (
    <>
    <PostFoodItem/>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element= {<Login/>} />
        <Route path='/signup' element= {<Signup/>} />
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
    {/* search input >> what's on your mind*/}
    {/* Scroll */}
    {/* cusine categories */}
    {/* filter */}
    {/* recommended restaurants */}
    {/* offers for you */}
    {/* restuarants one by one with infinite scroll */}
    </>
  )
}

export default App