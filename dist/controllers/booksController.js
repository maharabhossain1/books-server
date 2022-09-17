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
exports.deleteBook = exports.updateBook = exports.createBooks = exports.getAllBooks = void 0;
const error_1 = require("../utils/error");
const Books_1 = require("../models/Books");
const catchAsync_1 = require("../utils/catchAsync");
const handleValidationErr_1 = require("../utils/handleValidationErr");
const class_validator_1 = require("class-validator");
exports.getAllBooks = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield Books_1.Books.find({
        where: req.query,
    });
    if (books.length === 0) {
        return next(new error_1.AppError("No Books found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        results: books.length,
        data: {
            books,
        },
    });
}));
exports.createBooks = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Object.keys(req.body).length === 0) {
        return next(new error_1.AppError("Please Insert Data ", 404));
    }
    const newBooksData = yield Books_1.Books.create(req.body);
    const errors = yield (0, class_validator_1.validate)(newBooksData);
    if (errors.length > 0) {
        (0, handleValidationErr_1.handleValidationErr)(errors, next);
    }
    else {
        yield newBooksData.save();
        res.status(200).json({
            status: "success",
            data: {
                newBooksData,
            },
        });
    }
}));
exports.updateBook = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findSingleBook = yield Books_1.Books.findOneBy({
        id: Number(req.params.id),
    });
    if (!findSingleBook) {
        return next(new error_1.AppError("No Book found with that ID", 404));
    }
    else if (Object.keys(req.body).length === 0) {
        return next(new error_1.AppError("Please Insert Data ", 404));
    }
    else {
        const result = yield Books_1.Books.merge(findSingleBook, req.body).save(findSingleBook);
        res.status(200).json({
            status: "success",
            data: {
                result,
            },
        });
    }
}));
exports.deleteBook = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findSingleBook = yield Books_1.Books.findOneBy({
        id: Number(req.params.id),
    });
    if (!findSingleBook) {
        return next(new error_1.AppError("No Book found with that ID", 404));
    }
    else {
        const result = yield Books_1.Books.delete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                result,
            },
        });
    }
}));
//# sourceMappingURL=booksController.js.map