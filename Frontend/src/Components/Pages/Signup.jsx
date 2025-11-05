import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const Signup = () => {

  const [username , setUsername] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [contact , setContact] = useState('');
  const [address , setAddress] = useState('');
  const [message , setMessage] = useState('');
  const [error , setError] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleContactChange = (event) => {
    setContact(event.target.value)
  }
  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:4444/auth/signup', {username, email, password, contact, address}, {withCredentials: true})
      console.log(response.data)
      setMessage(response.data.message)
    } catch (error) {
      console.log(error.response.data.error)
      setError(error.response.data.error)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange}/>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <input type="text" placeholder="Contact" value={contact} onChange={handleContactChange}/>
        <input type="text" placeholder="Address" value={address} onChange={handleAddressChange}/>
        <button type="submit">Signup</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default Signup
