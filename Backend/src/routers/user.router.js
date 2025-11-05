import express from 'express'
import { getAllReviews, getDeleteReview, getReview, postAddReview, postUpdateReview } from '../controllers/user.controller.js';

const router = express.Router()

router.post('/add-review',postAddReview);
router.post('/update-review/:reviewId',postUpdateReview);
router.get('/delete-review/:reviewId',getDeleteReview);
router.get('/get-all-reviews',getAllReviews);
router.get('/get-review/:reviewId',getReview);

export default router