const router = require("express").Router();
const CompOrder = require("../models/CompOrder");

router.post("/", async (req, res) => {
  console.log(req.body);
  const newOrder = new CompOrder(req.body);

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
    await CompOrder.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been Deleted...");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//Get all
router.get("/", async (req, res) => {
  try {
    const Orders = await CompOrder.find();
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get ALL BY iD
router.get("/find/:userId", async (req, res) => {
  try {
    const Orders = await CompOrder.find({ userId: req.params.userId });

    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //DELETE  ALL
router.delete("/", async (req, res) => {
  try {
    const Orders = await CompOrder.deleteMany();
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
