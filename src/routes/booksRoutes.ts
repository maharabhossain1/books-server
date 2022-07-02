import express from "express";
import { checkAuth } from "../middleware/checkAuth";
import {
  createBooks,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/booksController";

export const router = express.Router();

router.route("/books").get(checkAuth, getAllBooks).post(checkAuth, createBooks);

router
  .route("/books/:id")
  .put(checkAuth, updateBook)
  .delete(checkAuth, deleteBook);
