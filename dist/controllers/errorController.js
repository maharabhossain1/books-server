"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    else {
        console.error("ERROR Message💥", err.message);
        console.error("ERROR Name💥", err);
        res.status(500).json({
            status: "error",
            warning: "Something went very wrong!",
            message: err.name,
        });
    }
};
const handleQueryFailedError = (err, res) => {
    const error = Object.assign({}, err);
    res.status(500).json({
        status: "error",
        warning: "Something went very wrong!",
        message: error.detail,
    });
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if (err.name === "QueryFailedError")
        return handleQueryFailedError(err, res);
    sendErrorProd(err, res);
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=errorController.js.map