import { NextFunction } from "express";
import { AppError } from "./error";

export const handleValidationErr = async (errors: any, next: NextFunction) => {
  interface modifiedErrors {
    [key: string]: any;
  }
  errors.map((err: any) => {
    const message = Object.values(err.constraints as modifiedErrors).join(" ");
    next(new AppError(message, 400));
  });
};
