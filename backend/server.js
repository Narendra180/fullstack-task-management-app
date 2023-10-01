import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRouter from "./routes/users/userRoutes.js";
import taskRouter from "./routes/tasks/taskRoutes.js";
import path from 'path';

await connectDB();

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

if(process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname,'frontend/dist')));
  app.get("*", (req,res) => res.sendFile(path.resolve(__dirname,"frontend/dist/index.html")))
} else {
  app.get("/", (req,res) => res.send("Server is ready"));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
})