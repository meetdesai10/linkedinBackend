import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 1008;
connectDB()
  .then((res) => {
    app.listen(port, () => {
      console.log(
        `Server is running at port: http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("mondodb connection failed", err);
  });

