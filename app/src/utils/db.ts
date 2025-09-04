import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";

export const sequelize = new Sequelize(DATABASE_URL);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error: any) {
    console.error("Unable to connect to the database:", error.message);
    return process.exit(1);
  }
};
