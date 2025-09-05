import express from "express";
import { Blog, ReadingList, ReadingListItem, User } from "../models";

const router = express.Router();

// GET /api/users
router.get("/", async (_, res, next) => {
  try {
    const users = await User.findAll({ include: "blogs" });

    return res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post("/", async (req, res, next) => {
  const { username, name } = req.body;

  try {
    const newUser = await User.create({ username, name });

    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:username
router.put("/:username", async (req, res, next) => {
  const { username } = req.params;
  const { username: newUsername } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = newUsername;
    await user.save();

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { read } = req.query;

  try {
    let whereCondition = {};
    if (read === "true") {
      whereCondition = { read: true };
    } else if (read === "false") {
      whereCondition = { read: false };
    }

    const user = await User.findByPk(id, {
      include: [
        {
          model: ReadingList,
          include: [
            {
              model: ReadingListItem,
              where: whereCondition,
              include: [Blog],
              required: Object.keys(whereCondition).length > 0,
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
