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
  } else {
    // 1) Log error
    console.error("ERROR Message💥", err.message);
    console.error("ERROR Name💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      warning: "Something went very wrong!",
      message: err.name,
    });
  }
};

// Query Type Error
const handleQueryFailedError = (err: AppError, res: Response) => {
  const error: any = { ...err };

  res.status(500).json({
    status: "error",
    warning: "Something went very wrong!",
    message: error.detail,
  });
};

// Error Handling Global Error Handler
export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "QueryFailedError") return handleQueryFailedError(err, res);

  sendErrorProd(err, res);
};
