const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Node_Lab");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const UserRouter = require("./Routes/UserRouter");
const ItemRouter = require("./Routes/ItemRouter");
const OrderRouter = require("./Routes/OrderRouter");

app.use("/api/users", UserRouter);
app.use("/api/items", ItemRouter);
app.use("/api/orders", OrderRouter);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
