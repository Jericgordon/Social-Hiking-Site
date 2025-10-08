import express from "express";
import myMongoDB from "../db/myMongoDB.js";

const router = express.Router();

router.get("/posts", async (req, res) => {
  console.log("Received request for /api/posts");

  try {
    const posts = await myMongoDB.getPosts();
    res.json({
      posts,
    });
  } catch (err) {
    console.error("Error in /api/posts route:", err);
    res.status(500).json({ error: "Internal Server Error", posts: [] });
  }
});
