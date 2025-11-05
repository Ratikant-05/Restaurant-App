import express from 'express'
import {postAddToCart, getCart, removeFromCart, updateCartItem, clearCart} from '../controllers/cart.controller.js'

const router = express.Router()

router.post('/addtoCart',postAddToCart);
router.get('/getCart/:userId',getCart);
router.delete('/deleteItem/:foodItemId',removeFromCart);
router.put('/updateCart/:foodItemId',updateCartItem);
router.delete('/clearCart/:userId',clearCart);

export default router;