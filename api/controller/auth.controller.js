// controllers/auth.controller.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  console.log(req.body);
  console.log("This is register controller");
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  console.log(newUser);

  newUser
    .save()
    .then(() =>
      res
        .status(201)
        .json({ message: "User registered successfully.", user: newUser }),
    )
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  console.log("Req is coming to login", req.body);

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // res.setHeader("Set-Cookie", "test=" + "myValue"); // Set cookie
    // return res.status(200).json({ message: "Success" }); // Send response

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        userId: user._id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      },
      // console.log(token, "token from auth"),
    );

    const { password: userPassword, ...userInfo } = user._doc;

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "None",
        maxAge: age,
      })
      .status(200)
      .json({ userInfo }); // Send response;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to login!" });
  }
};
export const logout = async (req, res) => {
  // Implement logout logic
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out." });
};
