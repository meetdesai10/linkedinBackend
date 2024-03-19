import cookieParser from "cookie-parser";
import express from "express";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// user route import
import userRouter from "../src/routes/user.routes.js";
// routes
app.use("/api/v1/users", userRouter);

export { app };
