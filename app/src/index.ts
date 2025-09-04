import express from "express";
import { errorHandler } from "./utils/middleware";
import { connectToDatabase } from "./utils/db";
import blogsRouter from "./controllers/blogs";
import usersRouter from "./controllers/users";
import authRouter from "./controllers/auth";
import authorsRouter from "./controllers/authors";

const app = express();
const PORT = process.env.PORT || 3000;

// declare middlewares
app.use(express.json());

// declare routes
app.use("/api", authRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/authors", authorsRouter);

// error middleware
app.use(errorHandler);

// main function to start the server after DB connection
const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

main();
