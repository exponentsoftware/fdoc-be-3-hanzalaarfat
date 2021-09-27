// const express = require("express");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { username, email, password, phone } = req.body;
  if (!username || !email || !password || !phone) {
    return res.status(422).json({ err: "plz filled properly" });
  }

  ///////////////////////////////// async await or  /////////
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      console.log(userExist);
      return res.status(422).json({ error: "Email alreday Exist" });
    }
    const user = new User({
      username,
      email,
      password,
      phone,
    });
    /// pre save password hashing in user schema
    const userRegister = await user.save();
    if (userRegister) {
      res.status(201).json({ message: "User resgister successfuly" });
    } else {
      res.status(500).json({ error: "Faild to register" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Incoreet Email addresh", err });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "plz fill data properly" });
  }

  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ err });
    }
    if (user) {
      if (user.authenticate(password)) {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
          expiresIn: "24h",
        });
        const { _id, email, name } = user;
        res.status(200).json({ token, _id, email, name });
      } else {
        return res.status.json({
          message: "incoreet usr or email",
        });
      }
    } else {
      return res.status(400).send({ message: "email or password wrong" });
    }
  });
};
