"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../middleware/checkAuth");
const booksController_1 = require("../controllers/booksController");
exports.router = express_1.default.Router();
exports.router.route("/books").get(checkAuth_1.checkAuth, booksController_1.getAllBooks).post(checkAuth_1.checkAuth, booksController_1.createBooks);
exports.router
    .route("/books/:id")
    .put(checkAuth_1.checkAuth, booksController_1.updateBook)
    .delete(checkAuth_1.checkAuth, booksController_1.deleteBook);
//# sourceMappingURL=booksRoutes.js.map