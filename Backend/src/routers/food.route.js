import express from 'express'
import { postAddFoodItem, getAllFoodItems, getFoodItemById, getFoodItemsByRestaurant, updateFoodItem, deleteFoodItem, getFoodItemsByCusineCategory, getAllCusineCategories} from '../controllers/food.controller.js';
import upload from '../middlewares/uploads.js';

const router = express.Router()

// add, update, delete, get one/all food items
router.post('/add-food-item', upload.single("image") ,postAddFoodItem); //done
router.get('/get-food-item/:foodId',getFoodItemById); //done read
router.get('/get-all-food-items',getAllFoodItems); //done
router.get('/get-food-items/:restaurantId',getFoodItemsByRestaurant); //made
router.put('/update-food-item/:foodId',updateFoodItem); //made
router.delete('/delete-food-item/:foodId',deleteFoodItem); //made
router.get('/get-food-by-category/:cusineCategory',getFoodItemsByCusineCategory); //made
router.get('/getAllCusineCategories',getAllCusineCategories); //made


export default router;