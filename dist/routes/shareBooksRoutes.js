"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../middleware/checkAuth");
const shareBooksController_1 = require("../controllers/shareBooksController");
exports.router = express_1.default.Router();
exports.router
    .route("/share_books")
    .get(checkAuth_1.checkAuth, shareBooksController_1.getAllShare)
    .post(checkAuth_1.checkAuth, shareBooksController_1.createShare);
exports.router
    .route("/share_books/share_by_user/:id")
    .get(checkAuth_1.checkAuth, shareBooksController_1.getAllShareBooksByUser);
exports.router
    .route("/share_books/share_with_user/:id")
    .get(checkAuth_1.checkAuth, shareBooksController_1.getAllShareBooksWithUser);
//# sourceMappingURL=shareBooksRoutes.js.map