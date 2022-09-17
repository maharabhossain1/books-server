"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../middleware/checkAuth");
const userController_1 = require("../controllers/userController");
exports.router = express_1.default.Router();
exports.router.route("/signup").post(userController_1.createUser);
exports.router.route("/login").post(userController_1.loginUser);
exports.router.route("/users").get(checkAuth_1.checkAuth, userController_1.getAllUsers);
exports.router
    .route("/users/:id")
    .put(checkAuth_1.checkAuth, userController_1.updateUser)
    .delete(checkAuth_1.checkAuth, userController_1.deleteUser);
//# sourceMappingURL=userRoutes.js.map