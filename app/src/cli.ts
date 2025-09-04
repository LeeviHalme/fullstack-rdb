import "dotenv/config";
import Blog from "./models/blog";

async function main() {
  try {
    const blogs = await Blog.findAll();

    blogs.forEach(blog => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
}

main();
