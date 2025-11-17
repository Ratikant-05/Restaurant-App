import express from 'express'
import {postRestaurant} from '../controllers/admin.controller.js';
import upload from '../middlewares/uploads.js'

const router = express.Router();

router.post('/admin-register',upload.single("image") , postRestaurant)

export default router
