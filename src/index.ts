import express from "express";
import { myDataSource } from "./app-data-source";
import { router as userRoutes } from "./routes/userRoutes";
import { router as booksRoutes } from "./routes/booksRoutes";
import { router as shareBooksRoutes } from "./routes/shareBooksRoutes";
import dotenv from "dotenv";
import { globalErrorHandler } from "./controllers/errorController";

// env config
dotenv.config({ path: ".env" });

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(express.json());

//  ROUTES
app.use("/api", userRoutes);
app.use("/api", booksRoutes);
app.use("/api", shareBooksRoutes);

// Global ERROR HANDLER MIDDLEWARE
app.use(globalErrorHandler);

// creating port and listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
