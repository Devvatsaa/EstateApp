import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to get users" });
  }
};
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get user" });
  }
};


export const updateUser = async (req, res) => {
  console.log("Request is coming");
  const id = req.params.id;
  console.log(id,"id is coming");
  const { password, ...inputs } = req.body;

  try {
    let updatedFields = { ...inputs };

    // If a new password is provided, hash it and include it in the update
    if (password) {
      const updatedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = updatedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    return res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error });
  }
};
