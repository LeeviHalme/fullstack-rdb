import express from "express";
import { Op } from "sequelize";
import { Blog } from "../models";
import { validateAndInjectJwt } from "../utils/middleware";

const router = express.Router();

// GET /api/blogs
router.get("/", async (req, res, next) => {
  const { search } = req.query;

  const whereClause: any = {};

  // if search query param is provided, filter blogs by title or author
  if (search) {
    whereClause[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { author: { [Op.iLike]: `%${search}%` } },
    ];
  }

  try {
    const blogs = await Blog.findAll({
      include: "user",
      where: whereClause,
      order: [["likes", "DESC"]],
    });

    return res.json(blogs);
  } catch (error) {
    next(error);
  }
});

// POST /api/blogs
router.post("/", validateAndInjectJwt, async (req, res, next) => {
  const { title, author, url, year } = req.body;

  try {
    const newBlog = await Blog.create({ title, author, url, year, userId: req.userId });

    return res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/blogs/:id
router.delete("/:id", validateAndInjectJwt, async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (req.userId !== blog.userId.toString()) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await Blog.destroy({ where: { id } });

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// PUT /api/blogs/:id
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { likes } = req.body;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.likes = likes;
    await blog.save();

    return res.status(200).json({ likes });
  } catch (error) {
    next(error);
  }
});

export default router;
