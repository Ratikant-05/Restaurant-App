import express from 'express'
import { postSignUp, postLogin, postLogout , getMe, postProfile } from '../controllers/login.controller.js';


const router = express.Router()

router.post('/signup',postSignUp)
router.post('/login',postLogin)
router.post('/logout',postLogout)
router.post('/profile', postProfile)
router.get('/me', getMe);


export default router;