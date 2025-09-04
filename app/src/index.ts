import "dotenv/config";
import express from "express";
import Blog from "./models/Blog";

const app = express();
const PORT = process.env.PORT || 3000;

const api = express.Router();

// GET /api/blogs
api.get("/blogs", async (_, res) => {
  try {
    const blogs = await Blog.findAll();
    return res.json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// POST /api/blogs
api.post("/blogs", async (req, res) => {
  const { title, author, url } = req.body;
  try {
    const newBlog = await Blog.create({ title, author, url });
    return res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create blog" });
  }
});

// DELETE /api/blogs/:id
api.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Blog.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).end();
    } else {
      return res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete blog" });
  }
});

app.use(express.json());
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
