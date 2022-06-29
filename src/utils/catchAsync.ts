import { Request, Response, NextFunction } from "express";

export const catchAsync = (fn: any) => {
  return (req: Response, res: Request, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
