import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {

  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  } 
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:4444/auth/login', {email, password}, {withCredentials: true})
      console.log(response.data.message + " " + "as" + " " + response.data.existingUser.username)
      setMessage(response.data.message)
    } catch (error) {
      console.log(error.response)
      // setError("Failed to login")
    }
  }  

  const handleLogout = async () => { 
    try {
      setError(''); // Clear any previous errors
      const response = await axios.post('http://localhost:4444/auth/logout', {}, {withCredentials: true})
      setMessage(response.data.message);
      // Clear user state/cookies if you're managing them in the frontend
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to logout. Please try again.';
      setError(errorMessage);
      setMessage('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        <button type="submit">Login</button>
        <button type="button" onClick={handleLogout}>Logout</button>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default Login
