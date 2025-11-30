const Cart = require("../models/Cart");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { productId, size, qty } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (p) => p.product.toString() === productId && p.size === size
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
    } else {
      cart.items.push({ product: productId, size, qty });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      // Filter out item based on ID or product+size combination
      cart.items = cart.items.filter(
        (item) => item._id.toString() !== req.params.itemId
      );
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/cart/:itemId
const updateCartItemQty = async (req, res) => {
  try {
    const { qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item._id.toString() === req.params.itemId
      );

      if (itemIndex > -1) {
        if (qty > 0) {
          cart.items[itemIndex].qty = qty;
        } else {
          // If qty is 0 or less, remove item
          cart.items.splice(itemIndex, 1);
        }
        await cart.save();
        // Return full cart to update frontend state
        const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
          "items.product"
        );
        res.json(updatedCart);
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart, updateCartItemQty };
