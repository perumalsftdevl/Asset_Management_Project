import Express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./controller/userRoutes.js";

const app = Express();

app.get("/", (req, res) => {
  try {
    return res.send("api working");
  } catch (error) {
    return res.send(error);
  }
});

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const __dirname = path.resolve();

app.listen(3000, () => {
  console.log("server running on port 3000  ");
});

app.use("/Users", userRoute);

///===================middleware====================////

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });
});
