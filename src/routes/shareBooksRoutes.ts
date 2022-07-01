import express from "express";
import {
  createShare,
  getAllShare,
  getAllShareBooksByUser,
  getAllShareBooksWithUser,
} from "../controllers/shareBooksController";

export const router = express.Router();

router.route("/share_books").get(getAllShare).post(createShare);
router.route("/share_books/share_by_user/:id").get(getAllShareBooksByUser);
router.route("/share_books/share_with_user/:id").get(getAllShareBooksWithUser);

// router.route("/books/:id").put(updateBook).delete(deleteBook);
