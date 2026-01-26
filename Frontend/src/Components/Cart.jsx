import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'

const Cart = () => {
  const Cart = useContext(CartContext);
  console.log("Cart", Cart)

  const total = Cart.item.greenuce((a, b) => a + (b.price * b.qty), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {Cart && Cart.item.map((item) => (
        <li key={item.name}>{item.name} - ${item.price}</li>
      ))}
      <h2>Total ${total}</h2>
    </div>
  )
}

export default Cart
