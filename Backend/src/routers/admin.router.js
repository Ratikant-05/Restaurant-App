import express from 'express'
import {postRestaurant} from '../controllers/admin.controller.js';

const router = express.Router();

router.post('/admin-register', postRestaurant)

export default router
