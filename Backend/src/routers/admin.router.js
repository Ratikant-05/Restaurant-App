import express from 'express'
import {postRestaurant} from '../controllers/admin.controller.js';
import upload from '../middlewares/uploads.js'

const router = express.Router();

router.post('/admin-register',upload.fields([{ name: "coverImage", maxCount: 1 },{ name:"images", maxCount: 10 }]), postRestaurant)

export default router
