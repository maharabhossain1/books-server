import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Books } from "./models/Books";

export const myDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "maharabhossain",
  password: undefined,
  database: "greetachtask",

  synchronize: true,
  entities: [User, Books],
});
