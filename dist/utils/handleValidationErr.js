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
exports.handleValidationErr = void 0;
const error_1 = require("./error");
const handleValidationErr = (errors, next) => __awaiter(void 0, void 0, void 0, function* () {
    errors.map((err) => {
        const message = Object.values(err.constraints).join(" ");
        next(new error_1.AppError(message, 400));
    });
});
exports.handleValidationErr = handleValidationErr;
//# sourceMappingURL=handleValidationErr.js.map