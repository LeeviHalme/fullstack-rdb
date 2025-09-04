import "dotenv/config";
import Blog from "./models/Blog";

async function main() {
  try {
    const blogs = await Blog.findAll();

    blogs.forEach(blog => {
      // @ts-ignore
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
}

main();
