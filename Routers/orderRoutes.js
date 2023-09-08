const express=require('express');

const router=express.Router();

const orderController=require('../Controllers/orderController');


//create a new order

router.post('/',orderController.createOrder);

//Get All Order

router.get('/',orderController.getAllOrders);

router.get('/:orderId', orderController.getOrderStatusByMobileNumber);

//Update Order Status

router.put('/:id/status/deliverytime',orderController.updateOrderStatus);

module.exports=router;