import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

//@desc     Create a new order
//@route    POST /api/orders/
//@access   Private
export const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No Order Items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

//@desc     Get an order by ID
//@route    GET /api/orders/:id
//@access   Private
export const getOrderById = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    res.status(404);
    throw new Error("Order Not Found");
  } else if (user.toString() !== order.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to access the resource");
  } else {
    res.status(200);
    res.send(order);
  }
});

//@desc     Pay for an order
//@route    PUT /api/orders/:id/pay
//@access   Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order Not Found");
  } else {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_item: req.body.update_item,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  }
});

//@desc     Get orders of a logged in user
//@route    GET /api/orders/myorders/
//@access   Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({
    user: req.user._id,
  });
  res.send(order);
});
