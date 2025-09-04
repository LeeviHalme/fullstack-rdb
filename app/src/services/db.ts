import { Sequelize } from "sequelize";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const sequelize = new Sequelize(DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error: any) {
    console.error("Unable to connect to the database:", error.message);
  }
};

main();

export default sequelize;
