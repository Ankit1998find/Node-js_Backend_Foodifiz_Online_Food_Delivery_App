const Cart = require('../Model/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const { userId, items } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        $push: {
          items: { $each: items }, // Use $each to push multiple items
        },
      },
      { upsert: true, new: true }
    );

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error adding item(s) to cart' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cart data' });
  }
};
