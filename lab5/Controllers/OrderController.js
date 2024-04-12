const OrderModel = require("../Models/OrderModel");
const OrderValidation = require("../Utils/OrderValidation");

getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.send(orders);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).send("Order Not Found");
    }
    res.send(order);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

createOrder = async (req, res) => {
  try {
    const valid = OrderValidation(req.body);
    if (!valid) {
      return res.status(400).send(OrderValidation.errors);
    }
    const order = new OrderModel(req.body);
    await order.save();
    res.send(order);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

updateOrder = async (req, res) => {
  try {
    const valid = OrderValidation(req.body);
    if (!valid) {
      return res.status(400).send(OrderValidation.errors);
    }
    const order = await OrderModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!order) {
      return res.status(404).send("Order Not Found");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
  return res.status(200).send("Updated Successfully");
};

deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findOneAndDelete({ id: req.params.id });
    if (!order) {
      return res.status(404).send("Order Not Found");
    }
    res.send(order);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
