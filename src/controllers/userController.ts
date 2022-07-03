import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { catchAsync } from "../utils/catchAsync";
import { User } from "../models/User";
import { AppError } from "../utils/error";
import { handleValidationErr } from "../utils/handleValidationErr";
import { validate } from "class-validator";

// Login user
export const loginUser: any = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, user_name } = req.body;
    if ((!email && !user_name) || !password) {
      return next(
        new AppError("Please provide email or user_name and password", 400)
      );
    }

    // find user by email or user_name
    let user;
    if (email) {
      user = await User.findOneBy({
        email,
      });
    } else {
      user = await User.findOneBy({
        user_name,
      });
    }
    // Check if user exists
    if (!user) {
      return next(
        new AppError(
          "Authentication Fail Please input correct Email or User_name And Password",
          401
        )
      );
    }

    // Check if password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(
        new AppError(
          "Authentication Fail Please input correct Email or User_name And Password",
          401
        )
      );
    }

    // Create JWT Payload
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN as string,
      }
    );
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      token,
      message: "Login Successfully",
    });
  }
);

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

    // Processing the password
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const newUserData = User.create({
      ...req.body,
      password: hashPassword,
    });

    // Validate the data
    const errors = await validate(newUserData);
    if (errors.length > 0) {
      handleValidationErr(errors, next);
    }

    // Token Generation
    const token = jwt.sign(
      { id: newUserData.id, email: newUserData.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRES_IN as string,
      }
    );
    await newUserData.save();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      token,
      message: "Signup Successfully",
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
    } else if (Object.keys(req.body).length === 0) {
      return next(new AppError("Please Insert Data ", 404));
    } else {
      // Processing the password
      const hashPassword = await bcrypt.hash(req.body.password, 12);
      const result = await User.merge(findUser, {
        ...req.body,
        password: hashPassword,
      }).save(findUser);

      // SEND RESPONSE
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
