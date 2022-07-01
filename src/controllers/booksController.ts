import { NextFunction, Request, Response } from "express";
import { Books } from "../models/Books";
import { catchAsync } from "../utils/catchAsync";

// Get all Books
export const getAllBooks: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await Books.find();

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
    const newBooksData = Books.create(req.body);
    await newBooksData.save();

    res.status(200).json({
      status: "success",
      data: {
        newBooksData,
      },
    });
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
      res.status(200).json({
        msg: "user not found ",
      });
    } else {
      const result = await Books.merge(findSingleBook, req.body).save(
        findSingleBook
      );
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
      res.status(200).json({
        msg: "user not found ",
      });
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
