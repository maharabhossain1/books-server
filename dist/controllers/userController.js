"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const catchAsync_1 = require("../utils/catchAsync");
const User_1 = require("../models/User");
const error_1 = require("../utils/error");
const handleValidationErr_1 = require("../utils/handleValidationErr");
const class_validator_1 = require("class-validator");
exports.loginUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, user_name } = req.body;
    if ((!email && !user_name) || !password) {
        return next(new error_1.AppError("Please provide email or user_name and password", 400));
    }
    let user;
    if (email) {
        user = yield User_1.User.findOneBy({
            email,
        });
    }
    else {
        user = yield User_1.User.findOneBy({
            user_name,
        });
    }
    if (!user) {
        return next(new error_1.AppError("Authentication Fail Please input correct Email or User_name And Password", 401));
    }
    const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!isValidPassword) {
        return next(new error_1.AppError("Authentication Fail Please input correct Email or User_name And Password", 401));
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
        status: "success",
        token,
        message: "Login Successfully",
    });
}));
exports.getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.find({
        where: req.query,
    });
    if (users.length === 0) {
        return next(new error_1.AppError("No User found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        results: users.length,
        data: {
            users,
        },
    });
}));
exports.createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return next(new error_1.AppError("Please Insert Data ", 404));
    }
    const hashPassword = yield bcrypt_1.default.hash(req.body.password, 12);
    const newUserData = User_1.User.create(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
    const errors = yield (0, class_validator_1.validate)(newUserData);
    if (errors.length > 0) {
        (0, handleValidationErr_1.handleValidationErr)(errors, next);
    }
    const token = jsonwebtoken_1.default.sign({ id: newUserData.id, email: newUserData.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    yield newUserData.save();
    res.status(200).json({
        status: "success",
        token,
        message: "Signup Successfully",
    });
}));
exports.updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield User_1.User.findOneBy({
        id: Number(req.params.id),
    });
    if (!findUser) {
        return next(new error_1.AppError("No User found with that ID", 404));
    }
    else if (Object.keys(req.body).length === 0) {
        return next(new error_1.AppError("Please Insert Data ", 404));
    }
    else {
        const hashPassword = yield bcrypt_1.default.hash(req.body.password, 12);
        const result = yield User_1.User.merge(findUser, Object.assign(Object.assign({}, req.body), { password: hashPassword })).save(findUser);
        res.status(200).json({
            status: "success",
            data: {
                result,
            },
        });
    }
}));
exports.deleteUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield User_1.User.findOneBy({
        id: Number(req.params.id),
    });
    if (!findUser) {
        return next(new error_1.AppError("No User found with that ID", 404));
    }
    else {
        const result = yield User_1.User.delete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                result,
            },
        });
    }
}));
//# sourceMappingURL=userController.js.map