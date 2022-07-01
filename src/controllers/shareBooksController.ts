import { NextFunction, Request, Response } from "express";
import { ShareBooks } from "../models/ShareBooks";
import { catchAsync } from "../utils/catchAsync";

export const createShare: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY

    const newShareData = await ShareBooks.create(req.body);

    await newShareData.save();

    res.status(200).json({
      status: "success",
      data: {
        newShareData,
      },
    });
  }
);

// Get all Books
export const getAllShare: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await ShareBooks.find({
      where: req.query,
    });
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
// Get all Books
export const getAllShareBooksByUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await ShareBooks.find({
      select: {
        id: true,
        target_user_id: true,
      },
      where: {
        sender_id: Number(req.params.id),
      },
      relations: {
        book: true,
      },
    });
    console.log(books);
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
// Get all Books
export const getAllShareBooksWithUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await ShareBooks.find({
      select: {
        id: true,
        sender_id: true,
      },
      where: {
        target_user_id: Number(req.params.id),
      },
      relations: {
        book: true,
      },
    });
    console.log(books);
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
