const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: String,
  name: String
});

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      product: productSchema,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model('Cart', cartSchema);
