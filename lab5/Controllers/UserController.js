const UserModel = require("../Models/UserModel");
const UserValidation = require("../Utils/UserValidation");
const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

getUserById = async (req, res) => {
  try {
    const user = await UserModel.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

createUser = async (req, res) => {
  try {
    const valid = UserValidation(req.body);
    if (!valid) {
      return res.status(400).send(UserValidation.errors);
    }
    const user = new UserModel(req.body);
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

updateUser = async (req, res) => {
  try {
    const valid = UserValidation(req.body);
    if (!valid) {
      return res.status(400).send(UserValidation.errors);
    }
    const user = await UserModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
  return res.status(200).send("Updated Successfully");
};

deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findOneAndDelete({ id: req.params.id });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
