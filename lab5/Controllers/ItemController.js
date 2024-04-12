const ItemModel = require("../Models/ItemModel");
const ItemValidation = require("../Utils/ItemValidation");

getAllItems = async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.send(items);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

getItemById = async (req, res) => {
  try {
    const item = await ItemModel.findOne({ id: req.params.id });
    if (!item) {
      return res.status(404).send("Item Not Found");
    }
    res.send(item);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

createItem = async (req, res) => {
  try {
    const valid = ItemValidation(req.body);
    if (!valid) {
      return res.status(400).send(ItemValidation.errors);
    }
    const item = new ItemModel(req.body);
    await item.save();
    res.send(item);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

updateItem = async (req, res) => {
  try {
    const valid = ItemValidation(req.body);
    if (!valid) {
      return res.status(400).send(ItemValidation.errors);
    }
    const item = await ItemModel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );

    if (!item) {
      return res.status(404).send("Item Not Found");
    }
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
  return res.status(200).send("Updated Successfully");
};

deleteItem = async (req, res) => {
  try {
    const item = await ItemModel.findOneAndDelete({ id: req.params.id });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
