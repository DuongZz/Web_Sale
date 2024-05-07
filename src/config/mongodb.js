import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

export const DBConnection = () => {
  mongoose.connect(DB);
  mongoose.connection.on("connected", () => {
    console.log("Connected to database");
  });
  mongoose.connection.on("error", (err) => {
    console.error("Connect fail: ", err);
  });
};
