const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  console.log(req.body);
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.log("here");
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been Deleted...");
  } catch {
    res.status(500).json(err.message);
  }
});

// //DELETE  ALL
router.delete("/", async (req, res) => {
  try {
    const Orders = await Order.deleteMany();
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL
router.get("/", async (req, res) => {
  try {
    const Orders = await Order.find();
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Order
router.get("/find/:userId", async (req, res) => {
  try {
    const Orders = await Order.find({ userId: req.params.userId });

    res.status(200).json(Orders);
  } catch {
    res.status(500).json(err);
  }
});

module.exports = router;
