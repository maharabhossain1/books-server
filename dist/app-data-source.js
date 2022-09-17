"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("./models/User");
const Books_1 = require("./models/Books");
const ShareBooks_1 = require("./models/ShareBooks");
dotenv_1.default.config({ path: ".env" });
exports.myDataSource = new typeorm_1.DataSource({
    url: process.env.DATABASE_URL,
    type: "postgres",
    host: `${process.env.DB_HOST}`,
    port: Number(`${process.env.DB_PORT}`),
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    synchronize: true,
    entities: [User_1.User, Books_1.Books, ShareBooks_1.ShareBooks],
    ssl: {
        rejectUnauthorized: false,
    },
});
//# sourceMappingURL=app-data-source.js.map