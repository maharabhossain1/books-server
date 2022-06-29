import { Request, Response } from "express";
import { User } from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    // EXECUTE QUERY
    const newUserData = User.create(req.body);
    await newUserData.save();

    res.status(200).json({
      status: "success",
      data: {
        newUserData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
