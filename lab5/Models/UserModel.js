const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: Number,
  name: String,
  age: Number,
  address: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("Users", schema);

module.exports = UserModel;
