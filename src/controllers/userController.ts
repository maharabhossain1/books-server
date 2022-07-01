import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { User } from "../models/User";
import { AppError } from "../utils/error";

// Get ALL User
export const getAllUsers: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const users = await User.find({
      where: req.query,
    });

    // Throwing Error If the user does not exist
    if (users.length === 0) {
      return next(new AppError("No User found with that ID", 404));
    }

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  }
);

// Create A User
export const createUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    if (Object.keys(req.body).length === 0) {
      return next(new AppError("Please Insert Data ", 404));
    }

    const newUserData = User.create(req.body);
    await newUserData.save();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      data: {
        newUserData,
      },
    });
  }
);

// Update A User
export const updateUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const findUser = await User.findOneBy({
      id: Number(req.params.id),
    });

    // Condition an response sent
    if (!findUser) {
      return next(new AppError("No User found with that ID", 404));
    } else {
      const result = await User.merge(findUser, req.body).save(findUser);
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
export const deleteUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const findUser = await User.findOneBy({
      id: Number(req.params.id),
    });

    // Condition an response sent
    if (!findUser) {
      return next(new AppError("No User found with that ID", 404));
    } else {
      const result = await User.delete(req.params.id);
      res.status(200).json({
        status: "success",
        data: {
          result,
        },
      });
    }
  }
);
