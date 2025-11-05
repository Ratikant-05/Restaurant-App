import { useState } from 'react'
import axios from 'axios'

const AddRestaurant = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [addRestaurant, setRestaurant] = useState({
    name: "",
    address: "",
    email: "",
    contact: ""
  })

  const onChange = (e)=> {
    setRestaurant({
      ...addRestaurant,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      const response = await axios.post("http://localhost:4444/admin/admin-register", addRestaurant);
      setSuccessMessage(response.data.message);
      setRestaurant({
        name: "",
        address: "",
        email: "",
        contact: ""
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to add restaurant. Please try again.';
      setError(errorMessage);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          name='name' 
          placeholder='Name' 
          value={addRestaurant.name}
          onChange={onChange}
        />
        <input 
          name='email' 
          placeholder='Email' 
          type='email'
          value={addRestaurant.email}
          onChange={onChange}
        />
        <input 
          name='address' 
          placeholder='Address' 
          value={addRestaurant.address}
          onChange={onChange}
        />
        <input 
          name='contact' 
          placeholder='Contact' 
          value={addRestaurant.contact}
          onChange={onChange}
        />
        <button type='submit'>Add Restaurant</button>
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  )
}

export default AddRestaurant
