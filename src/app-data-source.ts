import { DataSource } from "typeorm";
import dotenv from "dotenv";

import { User } from "./models/User";
import { Books } from "./models/Books";
import { ShareBooks } from "./models/ShareBooks";

// env config
dotenv.config({ path: ".env" });

export const myDataSource = new DataSource({
  type: "postgres",
  host: `${process.env.DB_HOST}`,
  port: Number(`${process.env.DB_PORT}`),
  username: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,

  synchronize: true,
  entities: [User, Books, ShareBooks],
});
