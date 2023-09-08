// models/Order.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    kitchenName:{ type: String, required: true },
    kitchenId:{ type: String, required: true },
  },
  quantity: { type: Number, required: true }
 

});

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  mobile: { type: String, required: true },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  cart: [cartItemSchema],
  totalPrice: { type: Number, required: true },
  orderTime: { type: Date, default: Date.now },
  orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' },
  deliveryTime:{ type:  String}

 
  
});

module.exports = mongoose.model('Order', orderSchema);
