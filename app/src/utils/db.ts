import { Sequelize } from "sequelize";
import { DATABASE_URL } from "./config";
import { Umzug, SequelizeStorage } from "umzug";

export const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();

  console.log("Migrations up to date", {
    files: migrations.map(mig => mig.name),
  });
};

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connection has been established successfully.");
  } catch (error: any) {
    console.error("Unable to connect to the database:", error.message);
    return process.exit(1);
  }
};
