import express from "express";
import dotenv from "dotenv";
import { DBConnection } from "./config/mongodb";
const app = express();
dotenv.config();

DBConnection();
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === "development") {
    console.log("Listening on port " + PORT + " ❤️");
  }
});
