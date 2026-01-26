import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4444/auth/profile`,{
        method: "POST",
        headers:{
          "Content-Type" : "application/json"
        },
        credentials: "include",
      })
      const data = await response.json()
      console.log(data)

      if(data){
        navigate('/profile')
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:4444/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await response.json()
      console.log(data)
      if (data) {
        navigate('/login')
      }
    } catch (error) {
      console.log("Logout >> ", error.message)
    }
  }
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div
        className="cursor-pointer hover:transform transition-transform duration-200 ease-out hover:translate-y-1"
        onClick={() => navigate("/home")}
      >
        <img className='w-25' src="/public/logo.jpg" alt="logo" />
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleProfile}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          Profile
        </button>

        <button
          onClick={()=>{navigate('/about')}}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition cursor-pointer"
        >
          About
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );

}

export default Navbar
