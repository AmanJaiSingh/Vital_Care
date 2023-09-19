const router = require("express").Router();
const CUser = require("../models/CUser");
const DUser = require("../models/DUser");
const jwt = require("jsonwebtoken");

//REGISTER --create User
router.post("/Cregister", async (req, res) => {
  const newUser = new CUser({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    address: req.body.address,
    age: req.body.age,
  });
  try {
    const saveduser = await newUser.save();
    res.status(201).json(saveduser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//LOGIN
//https://localhost:5000/api/auth/login
router.post("/Clogin", async (req, res) => {
  try {
    const user = await CUser.findOne({ username: req.body.username });

    !user && res.status(401).json("No user found");

    user.password !== req.body.password &&
      res.status(401).json("Wrong password");
    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
    // console.log("-------------------Here-----------------------");
  }
});

//---------------------------Docter------user--------------------------

router.post("/Dregister", async (req, res) => {
  const newUser = new DUser({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    organization: req.body.organization,
    address: req.body.address,
  });
  try {
    const saveduser = await newUser.save();
    res.status(201).json(saveduser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/Dlogin", async (req, res) => {
  try {
    const user = await DUser.findOne({ username: req.body.username });

    !user && res.status(401).json("No user found");

    user.password !== req.body.password &&
      res.status(401).json("Wrong password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
