const Order = require("../models/Order");
const Cart = require("../models/Cart");
const nodemailer = require("nodemailer");

// 1. Setup Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const createOrder = async (req, res) => {
  try {
    const { items, totalPrice } = req.body; // Items passed from frontend (cart snapshot)

    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
    });

    const createdOrder = await order.save();

    // Clear User Cart
    await Cart.findOneAndDelete({ user: req.user._id });

    // 2. Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.user.email,
      subject: `Order Confirmation #${createdOrder._id}`,
      html: `
                <h1>Thank you for your order!</h1>
                <p>Order ID: ${createdOrder._id}</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f4f4f4;">
                            <th style="padding: 8px; text-align: left;">Product</th>
                            <th style="padding: 8px; text-align: left;">Size</th>
                            <th style="padding: 8px; text-align: left;">Qty</th>
                            <th style="padding: 8px; text-align: left;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items
                          .map(
                            (item) => `
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.size}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.qty}</td>
                                <td style="padding: 8px; border-bottom: 1px solid #ddd;">₹ ${item.price}</td>
                            </tr>
                        `
                          )
                          .join("")}
                    </tbody>
                </table>
                <h3>Total Price: ₹ ${totalPrice}</h3>
            `,
    };

    // Send email asynchronously (don't block response if email fails, or handle error)
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log("Email Error:", err);
      else console.log("Email Sent:", info.response);
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getMyOrders };
