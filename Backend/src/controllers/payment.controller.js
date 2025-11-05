import crypto from 'crypto';

export const createOrder = async (req, res) => {
  try {
    console.log("Payment request received:", req.body);
    
    const { amount, currency, receipt, userId } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    const keyId = process.env.RAZORPAY_KEY_ID?.replace(/'/g, '');
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.replace(/'/g, '');

    if (!keyId || !keySecret) {
      return res.status(500).json({
        success: false,
        msg: "Razorpay credentials not configured"
      });
    }

    // Create order using Razorpay API directly
    const orderData = {
      amount: amount,
      currency: currency || 'INR',
      receipt: receipt || `order_${Date.now()}`,
      payment_capture: 1
    };

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Razorpay API error:", errorData);
      throw new Error(`Razorpay API error: ${response.status}`);
    }

    const order = await response.json();
    console.log("Razorpay order created:", order.id);

    res.status(200).json({
      success: true,
      order: order,
      key_id: keyId
    });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to create order",
      error: error.message
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        msg: "Missing payment details"
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET?.replace(/'/g, '');
    
    if (!keySecret) {
      return res.status(500).json({
        success: false,
        msg: "Razorpay key secret not configured"
      });
    }

    // Create signature for verification
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment is verified
      console.log("Payment verified successfully:", razorpay_payment_id);
      
      res.status(200).json({
        success: true,
        msg: "Payment verified successfully",
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id
      });
    } else {
      console.log("Payment verification failed - signature mismatch");
      res.status(400).json({
        success: false,
        msg: "Payment verification failed"
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      msg: "Payment verification failed",
      error: error.message
    });
  }
};

export const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const keyId = process.env.RAZORPAY_KEY_ID?.replace(/'/g, '');
    const keySecret = process.env.RAZORPAY_KEY_SECRET?.replace(/'/g, '');

    if (!keyId || !keySecret) {
      return res.status(500).json({
        success: false,
        msg: "Razorpay credentials not configured"
      });
    }

    const response = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`
      }
    });

    if (!response.ok) {
      throw new Error(`Razorpay API error: ${response.status}`);
    }

    const payment = await response.json();
    
    res.status(200).json({
      success: true,
      payment: payment
    });
  } catch (error) {
    console.error("Get payment details error:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to fetch payment details",
      error: error.message
    });
  }
};