import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { User } from "../models/User";

// Get ALL User
export const getAllUsers: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // EXECUTE QUERY
    const users = await User.find();

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
    const newUserData = User.create(req.body);
    await newUserData.save();

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
    if (!findUser) {
      res.status(200).json({
        msg: "user not found ",
      });
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
    if (!findUser) {
      res.status(200).json({
        msg: "user not found ",
      });
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
