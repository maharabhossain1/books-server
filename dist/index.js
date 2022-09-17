"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_data_source_1 = require("./app-data-source");
const userRoutes_1 = require("./routes/userRoutes");
const booksRoutes_1 = require("./routes/booksRoutes");
const shareBooksRoutes_1 = require("./routes/shareBooksRoutes");
const dotenv_1 = __importDefault(require("dotenv"));
const errorController_1 = require("./controllers/errorController");
const error_1 = require("./utils/error");
dotenv_1.default.config({ path: ".env" });
app_data_source_1.myDataSource
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", userRoutes_1.router);
app.use("/api", booksRoutes_1.router);
app.use("/api", shareBooksRoutes_1.router);
app.all("*", (req, res, next) => {
    next(new error_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorController_1.globalErrorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
//# sourceMappingURL=index.js.map