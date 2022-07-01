import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";

// Error Handling for Production

const sendErrorProd = (err: AppError, res: Response) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR Message💥", err.message);
    console.error("ERROR Name💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      warning: "Something went very wrong!",
      message: err.message,
    });
  }
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //   if (error.name === "CastError") error = handleCastErrorDB(error);
  //   if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  //   if (error.name === "ValidationError") error = handleValidationErrorDB(error);

  sendErrorProd(err, res);
};
