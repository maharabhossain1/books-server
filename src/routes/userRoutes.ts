import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  updateUser,
} from "../controllers/userController";

export const router = express.Router();

router.route("/signup").post(createUser);
router.route("/login").post(loginUser);
router.route("/users").get(checkAuth, getAllUsers);

router
  .route("/users/:id")
  .put(checkAuth, updateUser)
  .delete(checkAuth, deleteUser);
