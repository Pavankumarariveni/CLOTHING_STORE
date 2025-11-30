const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQty,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getCart).post(protect, addToCart);

router.put("/:itemId", protect, updateCartItemQty);

router.delete("/:itemId", protect, removeFromCart);

module.exports = router;
