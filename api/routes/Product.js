const router = require("express").Router();
const Product = require("../models/Product");
const CUser = require("../models/CUser");
const DUser = require("../models/DUser");
//post prodduct------------
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//----get by id------------
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json(product);
  } catch (err) {
    // console.log("here");
    res.status(500).json(err);
  }
});
//----get by user id------------
router.get("/findS/:id", async (req, res) => {
  try {
    const product = await Product.find({ createdBy: req.params.id });

    res.status(200).json(product);
  } catch (err) {
    // console.log("here");
    res.status(500).json(err);
  }
});
//GET ALLPRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been Deleted...");
  } catch {
    res.status(500).json(err);
  }
});

//DELETE ALL

router.delete("/", async (req, res) => {
  try {
    const DDelete = await Product.deleteMany();
    res.status(200).json(DDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
