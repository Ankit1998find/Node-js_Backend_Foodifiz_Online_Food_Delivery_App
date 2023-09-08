const Order=require('../Model/OrderModel');

//create a new oreder

exports.createOrder=async(req,res)=>{
   

    try{
        const orderData=req.body;
        const order=await Order.create(orderData);
        res.status(201).json(order);
    }catch(error){
        res.status(500).json({error:'Error in creating Oreder'});
    }

};

exports.getOrderStatusByMobileNumber = async (req, res) => {
  console.log("orderId", req.params.orderId);
  const orderId = req.params.orderId; // Assuming orderId is passed as a parameter

  try {
    const order = await Order.findOne({ _id: orderId }, 'orderStatus  deliveryTime'); // Fetch both orderStatus and deliveryTime fields
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ orderStatus: order.orderStatus, deliveryTime: order.deliveryTime });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in fetching order status and delivery time' });
  }
};

//get all orders
exports.getAllOrders=async(req,res)=>{
    try{
        const orders=await Order.find();
        res.json(orders);
    }catch(error){
        res.status(500).json({error:'Error in fetching data'});
    }
}

//Update Oreder Status

exports.updateOrderStatus = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
  
    const id = req.params.id;
    const { orderStatus, deliveryTime } = req.body;
  
    try {
      const updateOrder = await Order.findOneAndUpdate(
        { _id: id },
        { $set: { orderStatus, deliveryTime } }, // Update regardless of existing values
        { new: true }
      );
  
      if (!updateOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      res.json(updateOrder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error in updating' });
    }
  };
  