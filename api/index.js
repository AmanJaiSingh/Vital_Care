const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/User");
const productRoute = require("./routes/Product");
const orderRoute = require("./routes/Order");
const compOrderRoute = require("./routes/CompOrder");

let cors = require("cors");

dotenv.config();
// new here
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db Connection Successfull"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

app.use(express.json());

//----------------Routes----------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Ohk Done");
});

app.use("/api/auth", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/compOrder", compOrderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running");
});
