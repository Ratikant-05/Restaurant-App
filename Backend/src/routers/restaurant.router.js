import express from 'express'
import { getRestaurantById, getRestaurants } from '../controllers/restaurant.controller.js';

const router = express.Router()

router.get('/restaurants',getRestaurants); //done
router.get('/restaurants/:restaurantId',getRestaurantById); //made

export default router;