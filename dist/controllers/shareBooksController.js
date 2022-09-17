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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllShareBooksWithUser = exports.getAllShareBooksByUser = exports.getAllShare = exports.createShare = void 0;
const error_1 = require("../utils/error");
const ShareBooks_1 = require("../models/ShareBooks");
const catchAsync_1 = require("../utils/catchAsync");
const Books_1 = require("../models/Books");
const User_1 = require("../models/User");
exports.createShare = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return next(new error_1.AppError("Please Insert Data ", 404));
    }
    const { target_user_id, sender_id, book_id } = req.body;
    if (book_id) {
        const findSingleBook = yield Books_1.Books.findOneBy({
            id: Number(book_id),
        });
        if (!findSingleBook) {
            return next(new error_1.AppError("No Book found with that ID", 404));
        }
    }
    if (sender_id) {
        const findSingleUser = yield User_1.User.findOneBy({
            id: Number(sender_id),
        });
        if (!findSingleUser) {
            return next(new error_1.AppError("No User found with that ID", 404));
        }
    }
    if (target_user_id) {
        const findSingleUser = yield User_1.User.findOneBy({
            id: Number(target_user_id),
        });
        if (!findSingleUser) {
            return next(new error_1.AppError("No User found with that ID", 404));
        }
    }
    const newShareData = yield ShareBooks_1.ShareBooks.create(req.body);
    yield newShareData.save();
    res.status(200).json({
        status: "success",
        data: {
            newShareData,
        },
    });
}));
exports.getAllShare = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield ShareBooks_1.ShareBooks.find({
        where: req.query,
    });
    if (books.length === 0) {
        return next(new error_1.AppError("No Shared Books found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        results: books.length,
        data: {
            books,
        },
    });
}));
exports.getAllShareBooksByUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield ShareBooks_1.ShareBooks.find({
        select: {
            id: true,
            target_user_id: true,
        },
        where: {
            sender_id: Number(req.params.id),
        },
        relations: {
            book: true,
        },
    });
    if (books.length === 0) {
        return next(new error_1.AppError("No Shared Books found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        results: books.length,
        data: {
            books,
        },
    });
}));
exports.getAllShareBooksWithUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield ShareBooks_1.ShareBooks.find({
        select: {
            id: true,
            sender_id: true,
        },
        where: {
            target_user_id: Number(req.params.id),
        },
        relations: {
            book: true,
        },
    });
    if (books.length === 0) {
        return next(new error_1.AppError("No Shared Books found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        results: books.length,
        data: {
            books,
        },
    });
}));
//# sourceMappingURL=shareBooksController.js.map