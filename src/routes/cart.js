import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import auth from "../middlewares/auth.js"; // The gatekeeper

const router = express.Router();

// @route   GET /api/cart
// @desc    returns list of cart items
router.get("/", auth, async (req, res)=> {
  try {
    // Find the cart for this specific user
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      // if User has no cart yet -> Create one
      cart = new Cart({
        userId: req.user.id,
        items: [],
      });
    }
    await cart.save();
    res.status(200).json(cart.items);
    

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

})



// @route   POST /api/cart
// @desc    Add item to cart
router.post("/", auth, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // 1. Check if product actually exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Find the cart for this specific user
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      // Case A: User has no cart yet -> Create one
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity }],
      });
    } else {
      // Case B: Cart exists -> Check if product is already in it
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId,
      );

      if (itemIndex > -1) {
        // Product exists -> Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Product new -> Add to array
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/cart/:productId
// @desc    Update item quantity
router.put("/:productId", auth, async (req, res) => {
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item index
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === req.params.productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/cart/:productId
// @desc    Remove item from cart
router.delete("/:productId", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Filter out the item to remove
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId,
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
