const express = require("express");
const router = express.Router();
const ItemController = require("../Controllers/ItemController");

router.get("/", ItemController.getAllItems);
router.get("/:id", ItemController.getItemById);
router.post("/", ItemController.createItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);

module.exports = router;
