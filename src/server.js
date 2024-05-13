import express from "express";
import dotenv from "dotenv";
import { connectDB, getDB } from "./config/mongodb";
import { env } from "~/config/environment";
import app from "./app.js";
dotenv.config();
const PORT = env.PORT || 6969;

connectDB()
  .then(() => {
    console.log("Connected to MongoDB Cloud Atlas");

    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT + " ❤️");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB: ", error);
    process.exit(0);
  });

app.get("/", async (req, res) => {
  try {
    const collections = await getDB().listCollections().toArray();
    res.json({ collections });
  } catch (error) {
    console.error("Error fetching collections: ", error);
    res.status(500).json({ error: "Failed to fetch collections" });
  }
});
