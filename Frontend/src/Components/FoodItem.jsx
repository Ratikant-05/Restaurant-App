import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'

const FoodItem = (props) => {
  const Cart = useContext(CartContext);
  return (
    <div>
      <h2>{props.name}</h2>
      <div>
      <span>Price : ${props.price}</span> Qty : <span>{props.qty}</span>
      </div>
      <span>{props.description}</span>
      <br />
      <button style={{border: "1px solid black", backgroundColor:"yellow", padding:"2px"}} onClick={() => { Cart.setItem([...Cart.item, { name: props.name, price: props.price, qty: props.qty }]) }}>Add to Cart</button>
    </div>
  )
}

export default FoodItem
