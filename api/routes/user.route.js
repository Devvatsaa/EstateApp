import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import express from "express";
const router = express.Router();

router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.put("/:id",  updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
