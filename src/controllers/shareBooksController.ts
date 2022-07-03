import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error";
import { ShareBooks } from "../models/ShareBooks";
import { catchAsync } from "../utils/catchAsync";

// Create a Share
export const createShare: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    if (Object.keys(req.body).length === 0) {
      return next(new AppError("Please Insert Data ", 404));
    }
    const newShareData = await ShareBooks.create(req.body);
    await newShareData.save();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      data: {
        newShareData,
      },
    });
  }
);

// Get all Shares
export const getAllShare: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const books = await ShareBooks.find({
      where: req.query,
    });
    if (books.length === 0) {
      return next(new AppError("No Shared Books found with that ID", 404));
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

// Get ALL shared Data BY USER
export const getAllShareBooksByUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
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
    if (books.length === 0) {
      return next(new AppError("No Shared Books found with that ID", 404));
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

// Get all Shared With USER Data
export const getAllShareBooksWithUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
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
    if (books.length === 0) {
      return next(new AppError("No Shared Books found with that ID", 404));
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
