import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import userRouter from "./routes/users/userRoutes.js";

const port = process.env.PORT || 5000;
const app = express();

app.use("/api/v1/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})