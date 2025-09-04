import express from "express";
import jwt from "jsonwebtoken";

import { User } from "../models";
import { JWT_SECRET } from "../utils/config";

const router = express.Router();

// POST /api/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || password !== "salainen") {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const userForToken = {
      username: user.username,
      id: user.id,
    };

    const token = jwt.sign(userForToken, JWT_SECRET);

    return res.status(200).json({ token, user: user.toJSON() });
  } catch (error) {
    next(error);
  }
});

export default router;
