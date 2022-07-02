import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  createShare,
  getAllShare,
  getAllShareBooksByUser,
  getAllShareBooksWithUser,
} from "../controllers/shareBooksController";

export const router = express.Router();

router
  .route("/share_books")
  .get(checkAuth, getAllShare)
  .post(checkAuth, createShare);

router
  .route("/share_books/share_by_user/:id")
  .get(checkAuth, getAllShareBooksByUser);

router
  .route("/share_books/share_with_user/:id")
  .get(checkAuth, getAllShareBooksWithUser);

