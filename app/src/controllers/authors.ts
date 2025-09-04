import express from "express";
import { Blog } from "../models";
import { sequelize } from "../utils/db";

const router = express.Router();

// GET /api/authors
router.get("/", async (_, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [sequelize!.fn("COUNT", sequelize!.col("author")), "blogs"],
        [sequelize!.fn("SUM", sequelize!.col("likes")), "likes"],
      ],
      group: ["author"],
      order: [[sequelize!.col("likes"), "DESC"]],
    });

    return res.json(authors);
  } catch (error) {
    next(error);
  }
});

export default router;
