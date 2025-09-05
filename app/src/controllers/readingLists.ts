import express from "express";
import { Blog, ReadingList, ReadingListItem, User } from "../models";
import { validateAndInjectJwt } from "../utils/middleware";

const router = express.Router();

// POST /api/readinglists
router.post("/", async (req, res, next) => {
  const { blog_id, user_id } = req.body;

  try {
    const blog = await Blog.findByPk(blog_id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the reading list entry already exists
    let listId;
    const existingEntry = await ReadingList.findOne({
      where: { user_id },
    });

    if (existingEntry) {
      listId = existingEntry.id;
    } else {
      const newList = await ReadingList.create({ user_id });
      listId = newList.id;
    }

    const readingList = await ReadingListItem.create({
      blog_id,
      reading_list_id: listId,
      read: false,
    });

    return res.status(201).json(readingList);
  } catch (error) {
    next(error);
  }
});

// PUT /api/readinglists/:id
router.put("/:id", validateAndInjectJwt, async (req, res, next) => {
  const { id } = req.params;
  const { read } = req.body;

  if (!read) return res.status(400).json({ error: "Read status is required" });

  try {
    const readingList = await ReadingList.findOne({ where: { user_id: req.userId } });

    if (!readingList) {
      return res.status(404).json({ error: "Reading list not found" });
    }

    const item = await ReadingListItem.findOne({
      where: { blog_id: id, reading_list_id: readingList.id },
    });

    if (!item) {
      return res.status(404).json({ error: "Blog is not found in the reading list" });
    }

    item.read = true;
    await item.save();

    return res.json({ read });
  } catch (error) {
    next(error);
  }
});

export default router;
