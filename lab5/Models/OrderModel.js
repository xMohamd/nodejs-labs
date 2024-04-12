const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: Number,
  totalPrice: Number,
  items: Array,
});

const OrderModel = mongoose.model("Orders", schema);
module.exports = OrderModel;
