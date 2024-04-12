const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number,
  desc: String,
});

const ItemModel = mongoose.model("Items", schema);
module.exports = ItemModel;
