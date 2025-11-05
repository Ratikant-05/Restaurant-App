import express from 'express';
import { createOrder, verifyPayment, getPaymentDetails } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/payment/:paymentId', getPaymentDetails);

export default router;
