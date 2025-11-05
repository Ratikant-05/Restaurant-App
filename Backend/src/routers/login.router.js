import express from 'express'
import { postSignUp, postLogin, postLogout } from '../controllers/login.controller.js';


const router = express.Router()

router.post('/signup',postSignUp)
router.post('/login',postLogin)
router.post('/logout',postLogout)


export default router;