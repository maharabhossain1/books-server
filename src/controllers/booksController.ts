import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error";
import { Books } from "../models/Books";
import { catchAsync } from "../utils/catchAsync";
import { handleValidationErr } from "../utils/handleValidationErr";
import { validate } from "class-validator";

// Get all Books
export const getAllBooks: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await Books.find({
      where: req.query,
    });
    if (books.length === 0) {
      return next(new AppError("No Books found with that ID", 404));
    }
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: books.length,
      data: {
        books,
      },
    });
  }
);

// Create A User
export const createBooks: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    if (Object.keys(req.body).length === 0) {
      return next(new AppError("Please Insert Data ", 404));
    }

    const newBooksData = await Books.create(req.body);
    // Validate the data
    const errors = await validate(newBooksData);
    if (errors.length > 0) {
      handleValidationErr(errors, next);
    } else {
      await newBooksData.save();

      res.status(200).json({
        status: "success",
        data: {
          newBooksData,
        },
      });
    }
  }
);

// Update A Books
export const updateBook: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const findSingleBook = await Books.findOneBy({
      id: Number(req.params.id),
    });

    if (!findSingleBook) {
      return next(new AppError("No Book found with that ID", 404));
    } else if (Object.keys(req.body).length === 0) {
      return next(new AppError("Please Insert Data ", 404));
    } else {
      // Merge and Save the Data
      const result = await Books.merge(findSingleBook, req.body).save(
        findSingleBook
      );

      // Response Send
      res.status(200).json({
        status: "success",
        data: {
          result,
        },
      });
    }
  }
);

// Delete A User
export const deleteBook: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const findSingleBook = await Books.findOneBy({
      id: Number(req.params.id),
    });
    if (!findSingleBook) {
      return next(new AppError("No Book found with that ID", 404));
    } else {
      const result = await Books.delete(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          result,
        },
      });
    }
  }
);
