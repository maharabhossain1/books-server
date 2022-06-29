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
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //   if (process.env.NODE_ENV === "development") {
  //     sendErrorDev(err, res);
  //   } else if (process.env.NODE_ENV === "production") {
  let error = { ...err };

  //   if (error.name === "CastError") error = handleCastErrorDB(error);
  //   if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  //   if (error.name === "ValidationError") error = handleValidationErrorDB(error);

  sendErrorProd(error, res);
  //   }
};
