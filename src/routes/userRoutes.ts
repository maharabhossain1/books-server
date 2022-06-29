import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController";

export const router = express.Router();

router.route("/users").get(getAllUsers).post(createUser);

router.route("/users/:id").put(updateUser).delete(deleteUser);
