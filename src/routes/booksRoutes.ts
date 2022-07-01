import express from "express";
import {
  createBooks,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/booksController";

export const router = express.Router();

router.route("/books").get(getAllBooks).post(createBooks);

router.route("/books/:id").put(updateBook).delete(deleteBook);
