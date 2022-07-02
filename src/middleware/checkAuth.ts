import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";

interface RequestUserAuth extends Request {
  user?: {
    id: number;
    role: string;
    // or any type
  };
}

export const checkAuth: any = catchAsync(
  async (req: RequestUserAuth, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return next(new AppError("No token found", 401));
    }
    const token = authorization.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  }
);
